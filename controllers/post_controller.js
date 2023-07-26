const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.create = async function(req,res){
    
    try{

           let post = await Post.create({

            content :req.body.content,
            user:req.user._id,
       });
         
          if(req.xhr){
             
              return res.status(200).json({
                 data:{
                     post:post
                 },
                 massage:"P0st created!"
              })
          }

        req.flash('success','Post created..!');
        return res.redirect('back');
      
    }catch(err){
       req.flash('error','Post does not created');
       return res.redirect('back'); 
    }
   
};


module.exports.destroy = async function(req,res){
 
     const postId = req.params.id;

    try{
 
       let postDelete = await Post.findByIdAndRemove(postId);
    
        if(postDelete){
            //if post is found delete all comments associated with comments
             await Comment.deleteMany({post:postId});
             req.flash('error','Post deleted successfully..!')
             return res.redirect('back');
        }
        else{
            req.flash('error',err);
            console.log("error in finding post",err);
            return res.redirect('back');
        }

    }catch(err){
       req,flash('error','Post does not deleted');
       return res.redirect('back');
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
