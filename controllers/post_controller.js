const Post = require('../models/post');
const Comment = require('../models/comments');
const Like = require('../models/like');
module.exports.create = async function(req,res){
    
    try{

           let post = await Post.create({

            content :req.body.content,
            user:req.user._id,
       });
         
          if(req.xhr){
            console.log("**********",req.xhr);
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name');
            console.log("******post**********",post);
              return res.status(200).json({
                 data:{
                     post:post
                 },
                 massage:"Post created!"
              });
          }
        req.flash('success','Post created..!');
        return res.redirect('back');
      
    }catch(err){
        req.flash('error', err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');
    }
   
};


module.exports.destroy = async function(req,res){
 
     const postId = req.params.id;

    try{
 
       let postDelete = await Post.findByIdAndRemove(postId);
    
        if(postDelete){
            //if post is delete then delete the all associated likes for the post and all its comments likes too
            
            await Like.deleteMany({
                 likeable:post,
                 onModel:'Post'
            });

            await Like.deleteMany({_id:{
                 $in:post.comments
            }});


            //if post is found delete all comments associated with comments
             await Comment.deleteMany({post:postId});

           
             
             if(req.xhr){
                 
                  return res.status(200).json({
                      data:{
                         post_id: req.params.id
                      },
                      message:"Post Deleted Successfully"
                  });
             }
             req.flash('error','Post deleted successfully..!')
             return res.redirect('back');
        }
        else{
            req.flash('error',err);
            console.log("error in finding post",err);
            return res.redirect('back');
        }

    }catch(err){
       req.flash('error','Post does not deleted');
       return res.redirect('back');
    }     
};
