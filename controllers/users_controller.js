const User = require('../models/user');
//create controller for the profile
module.exports.profile = function (req,res){
     
      res.render('profile',{         
            title : "Codeial | profile"
      });
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
  module.exports.create = function(req, res){
      if (req.body.password != req.body.confirm_password){
          return res.redirect('back');
      }
      
      User.findOne({email :req.body.email})
          .then((user) => {
              
               if(!user){
                  User.create(req.body)
                   .then((user)=>{
                      return res.redirect('/users/sign-in');
                   })
                   .catch((err)=>{
                     
                     console.log('Error in creating user while signing:',err);
                     return res.redirect('back');
                   })
               }
               else{
                  return res.redirect('back');
               }
          })
          .catch((err) =>{
             console.log('Error in finding user in signing up :',err);
             return('back');
          })
  

  }
  
  
  // sign in and create a session for the user
  module.exports.createSession = function(req, res){
       
      return res.redirect('/');
  }