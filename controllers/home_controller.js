const User = require('../models/user');
const Post = require('../models/post');
module.exports.home = async function(req,res){

      try{

            let posts =  await Post.find({})
            .populate('user') //populate user filed
            .populate({
                  path:'comments',
                  populate:{
                        path:'user'
                  }
            });

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

