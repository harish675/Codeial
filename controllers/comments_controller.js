
const Comment = require('../models/comments');

const Post = require('../models/post');

console.log("comments controller called...");

module.exports.create = async function (req, res) {
 // console.log("You are inside the create method of comments");
  // console.log("req.body:", req.body);
  const post_id = req.body.post;
      try{
        
        let post = await Post.findById(post_id);
          if (!post) {
           req.flash('error',err);
            return res.redirect('back');
          }
  
        let comment = await Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        });

        post.comments.push(comment);
        post.save();
             if(req.xhr){
                  // Similar for comments to fetch the user's id!
                  comment = await comment.populate('user', 'name').execPopulate();
                // console.log("Xhr request called");
                 return res.status(200).json({
                     data:{
                         comment:comment
                     },
                     massage:'Comment Created'
                 });
             }        
             req.flash('success','comment added..!');
            return res.redirect('back');
      }catch(err){
         
         req.flash('error','error in adding comment');
         return res.redirect('back');
      }
};

module.exports.destroy =  async function(req,res){
 
    try{
   
         let comment = await Comment.findById(req.params.id);
         if (comment.user == req.user.id) {
              let postID = comment.post;
              let comments = await Comment.findByIdAndRemove(req.params.id);
              await Post.findByIdAndUpdate(postID, { $pull: { comments: [req.params.id] } });
               
              // send the comment id which was deleted back to the views
              if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

              req.flash('error','comments deleted successfully.')
              return res.redirect('back');
          }

        else{
            req.flash('error',err);
            return res.redirect('back');
          }
      
    }catch{
        req.flash('error','comment not deleted');
        return res.redirect('back');
    }
  
};