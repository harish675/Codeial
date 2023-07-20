const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.create = async function(req,res){
    
    try{

        await Post.create({

            content :req.body.content,
            user:req.user._id,

       });
   
        return res.redirect('back');
      
    }catch(err){
       console.log("error in crating post",err);
       return; 
    }
   
};


module.exports.destroy = async function(req,res){
 
     const postId = req.params.id;

    try{
 
       let postDelete = await Post.findByIdAndRemove(postId);
    
        if(postDelete){
            //if post is found delete all comments associated with comments
             await Comment.deleteMany({post:postId})
             return res.redirect('back');
        }
        else{
            console.log("error in finding post",err);
            return res.redirect('back');
        }

    }catch(err){
       console.log('Error',err);
       return;
    }
    // Post.findById(req.params.id)
    // .then((post)=>{
         
    //      if(post.user == req.user.id){
            
    //         Post.remove();   
    //         Comment.deleteMany({post:req.params.id},function(err){
    //              return res.redirect('back');
    //         });
    //      }
    //      else{
    //          return res.redirect('back');
    //      };     
    // })
    // .catch ((err)=>{
    //      console.log("Error in finding the id",err);
    //      return res.redirect('back'); 
    // })
        
};
