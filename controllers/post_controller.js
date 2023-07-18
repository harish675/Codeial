const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.create = function(req,res){
   
    Post.create({
         content :req.body.content,
         user:req.user._id,
    })
    .then((content)=>{
    

           return res.redirect('back');
         
    })
    .catch((err)=>{
        console.log("Error while saving the post");
        return res.redirect('back');
    })
};


module.exports.destroy = function(req,res){
     
    const postId = req.params.id;
    console.log("*******************");
    console.log(req.body);
    console.log("*******************");
    console.log(postId);
 
      Post.findByIdAndRemove(postId)
      .then((postDelete)=>{

        if(postDelete){
            //if post is found delete all comments associated with comments

            Comment.deleteMany({post:postId})
            .then(()=>{
                 return res.redirect('back');
            })
            .catch((err)=>{
                 console.log("error in deleting the comments",err);
                 return res.redirect('back');
            })
        }
        else{
            console.log("error in finding post",err);
            return res.redirect('back');
        }
      }) 
      .catch((err)=>{   
        console.log("Error in finding Post",err);
        return res.redirect('back');
      })
    

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
