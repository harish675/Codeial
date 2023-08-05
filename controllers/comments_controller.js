
const Comment = require('../models/comments');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');

module.exports.create = async function (req, res) {
  const post_id = req.body.post;
      try{
        
        let post = await Post.findById(post_id);
       
          if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
    
            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user', 'name email');
           // commentsMailer.newComment(comment);

      let job =  queue.create('emails',comment).save(function(err){
             
              if(err){
                 console.log('error sending to the queue');
              }

              console.log('job',job.id);
        });
    
             if(req.xhr){

                 return res.status(200).json({
                     data:{
                         comment:comment
                     },
                     massage:'Comment Created'
                 });
             }        
              req.flash('success','comment added..!');
             return res.redirect('back');
          }
      }catch(err){
         req.flash('error','error in adding comment');
         console.log("*******Error in adding comment*********",err);
         return;
      }
};

module.exports.destroy =  async function(req,res){
 
    try{
   
         let comment = await Comment.findById(req.params.id);
         if (comment.user == req.user.id) {
              let postID = comment.post;
              let comments = await Comment.findByIdAndRemove(req.params.id);
              let post =  await Post.findByIdAndUpdate(postID, { $pull: { comments: req.params.id } });
               
              // send the comment id which was deleted back to the views
              if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comments deleted"
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
        return;
    }
  
};