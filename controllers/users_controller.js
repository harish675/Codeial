const User = require('../models/user');
//create controller for the profile
module.exports.profile = async function (req,res){
    console.log(req.params.id);
      try{
         let user = User.findById(req.params.id);

          if(user){
             res.render('profile',{         
             title : "Codeial | profile",
             profile_user:user,
           });
         }
          else{
           console.log("user is not found in the list");
           return redirect('back');
        }
      }
      catch(err){
            console.log('Error',err);
            return;
      }
      
}
module.exports.update = async function(req,res){
      
      try{
          if(req.user.id == req.params.id){
            await User.findByIdAndUpdate(req.params.id,req.body);
              return res.redirect('back');
          }
        else{
            return res.status(401).send('Unauthorized');
         }       
      }
      catch(err){
          console.log("Error ",err);
          return;
      }

 } 

 // render the sign up page
module.exports.signUp = function(req, res){

     //when user authenticated then will go in profile page
     if(req.isAuthenticated()){
       return res.redirect('/users/profile');
     }
     
      return res.render('user_sign_up', {
          title: "Codeial | Sign Up"
      })
  }
  
  
  // render the sign in page
  module.exports.signIn = function(req, res){
    
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
      }
    
    return res.render('user_sign_in', {
          title: "Codeial | Sign In"
      })
  }
  
  // get the sign up data
  module.exports.create = async function(req, res){
      if (req.body.password != req.body.confirm_password){
          return res.redirect('back');
      }
      
    
     try{
         
         let user = await User.findOne({email :req.body.email})
             if(!user){
                await User.create(req.body);  
                return res.redirect('/users/sign-in');
              }
            else{
               return res.redirect('back');
             }
      }
      catch{
              console.log("Error",err);
              return;   
       }
}
  
  
  // sign in and create a session for the user
  module.exports.createSession = function(req, res){
       
      return res.redirect('/');
  }

  //create sign-out controller

  module.exports.destroySession = function(req,res,next){

     req.logout(function(err){
          if(err){
              return next(err);
          }

          return res.redirect('/')
     });
     

  }