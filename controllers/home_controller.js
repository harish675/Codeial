const Post = require('../models/post');
module.exports.home =function(req,res){

      Post.find({})
      .populate('user') //populate user filed
      .exec() 
      .then((posts)=>{
          return  res.render('home',{
                title:'Home',
                posts:posts,
          })
      })
      .catch((err)=>{
           
           console.log("Not found any Post");
           return res.status(500).send('Internal Server Error');
      }) ; 

      
} ;

//module.exports.actionName =function(req,res){}

