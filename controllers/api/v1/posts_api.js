const Post = require('../../../models/post');
const Comment = require('../../../models/comments');

module.exports.index = async function(req,res){
      
         let posts =  await Post.find({})
         .sort('-createdAt')
         .populate('user') //populate user filed
         .populate({
               path:'comments',
               populate:{
                     path:'user'
               }
         });
     return res.json(200,{
        massage:"List of Posts",
        posts:posts
     })
}

module.exports.destroy = async function(req,res){
 
   const postId = req.params.id;

  try{

     let postDelete = await Post.findById(postId);
      if(post.user == req.user.id){
           
           post.remove();

           await Comment.deleteMany({posts:req.params.id});
           return res.json(200,{
            massage:"Post and associated comments deleted successfully!"
        })

      }
      else{
         
         return res.json(401,{
             message:"you can not delete post!"
         });
      }
  }catch(err){
      console.log("********* error",err);
      return res.json(500,{
          massage:"Internal Server Error"
      });
  }      
};
