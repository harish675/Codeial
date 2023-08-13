
const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comments');


//create action for routes

module.exports.toggleLike = async function(req,ress){
     
     try{
         
          //likes/toggle/?id=abcdef&type=Post

          let likeable;
          let deleted;

          if(req.query.type == 'Post'){
         
             likeable = await Post.findById(req.query.id).populate('likes');

            
          }else{
              
             likeable = await Comment.findById(req.query.id).populate('likes');
             
          }
          
          //check if like already  exits

          let existingLike = await Link.findOne({
              likeable:req.query.id,
              onModel:req.query.type,
              user:req.user._id
          })
     
         //if a like all ready exits the delete it else make a new like
          if(existingLike){
             
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;    
          }
          else{
             //else does not exits like
              let newLike = await Like.create({
                 user:req.user._id,
                 likeable:req.query.id,
                 onModel:req.query.type,
              });

              likeable.likes.push(newLike._id);
              likeable.save();
          }
      
        return res.json(200,{
             message:"Request Successful",
             data:{
                 deleted:deleted
             }
        })  
     }catch(err){   
         console.log(err);
         return res.json(500,{
              message:'Internal Sever Error'
         });    
     }
}