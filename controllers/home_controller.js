const User = require('../models/user');
const Post = require('../models/post');


module.exports.home = async function(req,res){

      try{
            // populate the user of each post
            //populate the likes of each post and comment
            let posts =  await Post.find({})
            .sort('-createdAt')
            .populate('user') //populate user filed
            .populate({
                  path:'comments',
                  populate:{
                        path:'user'
                  },
                  populate:{
      
                         path:'likes'
                  }
            }).populate('comments')
              .populate('likes');
            let users= await User.find({});
            return  res.render('home',{
                 title:'Home',
                 posts:posts,
                all_users:users,
               }); 
      }catch(err){
             console.log("Error in loading the home page ",err);
             return;
      }

       
} ;

//module.exports.actionName =function(req,res){}

