
const Comment = require('../models/comments');

const Post = require('../models/post');

console.log("comments controller called...");

module.exports.create = function (req, res) {
  console.log("You are inside the create method of comments");
  console.log("req.body:", req.body);
  const post_id = req.body.post;

  Post.findById(post_id)
    .then((post) => {
      if (!post) {
        console.log("Post not found");
        return res.redirect('back');
      }

      Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      })
        .then((comment) => {
          // Add comment to the post and save
          post.comments.push(comment);
          post.save();
          return res.redirect('back');
        })
        .catch((err) => {
          console.log("Error creating the comment:", err);
          return res.redirect('back');
        });
    })
    .catch((err) => {
      console.log("Error finding the post:", err);
      return res.redirect('back');
    });
};
