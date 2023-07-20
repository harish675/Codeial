
const Comment = require('../models/comments');

const Post = require('../models/post');

console.log("comments controller called...");

module.exports.create = async function (req, res) {
  console.log("You are inside the create method of comments");
  console.log("req.body:", req.body);
  const post_id = req.body.post;
      try{
        
        let post = await Post.findById(post_id);
          if (!post) {
            console.log("Post not found");
            return res.redirect('back');
          }
  
        let comment = await Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        });
            post.comments.push(comment);
            post.save();
            return res.redirect('back');
      }catch(err){
         
          console.log('Error',err);
          return;
      }
};

module.exports.destroy =  async function(req,res){
 
    try{
   
         let comment = await Comment.findById(req.params.id);
         if (comment.user == req.user.id) {
              let postID = comment.post;
              let comments = await Comment.findByIdAndRemove(req.params.id);
              await Post.findByIdAndUpdate(postID, { $pull: { comments: [req.params.id] } });
              return res.redirect('back');
          }

        else{
            return res.redirect('back');
          }
      
    }catch{
         console.log('Error ',err);
         return;
    }
  
};