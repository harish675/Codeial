const User = require('../models/user');
const Post = require('../models/post');
module.exports.home =function(req,res){

      Post.find({})
      .populate('user') //populate user filed
      .populate({
            path:'comments',
            populate:{
                  path:'user'
            }
      })
      .exec() 
      .then((posts)=>{
          
          //To Get all users in the home page
          User.find({})
            .then((users)=>{
               
                return  res.render('home',{
                      title:'Home',
                      posts:posts,
                     all_users:users,
                   });
               })
               .catch((err)=>{
                   console.log("Error to finding all users ");
                   return res.redirect('back');
               })
       })
      .catch((err)=>{
           
           console.log("Not found any Post");
           return res.status(500).send('Internal Server Error');
      }) ; 

      
} ;

//module.exports.actionName =function(req,res){}

