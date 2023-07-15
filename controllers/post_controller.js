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

