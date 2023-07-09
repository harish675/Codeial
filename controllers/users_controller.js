const User = require('../models/user');

//create controller for the profile
module.exports.profile = function (req,res){
    
     if(req.cookies.user_id){
        
        User.findById(req.cookies.user_id)
        .then((user)=>{
            
              return res.render('profile',{
                   title : 'user-profile',
                   user : user
              })
        })
        .catch((err)=>{
              return res.redirect('users/sign-in');
        });   
     }
     else{
         return res.redirect('users/sign-in');
     }
       
 }



 // render the sign up page
module.exports.signUp = function(req, res){
      return res.render('user_sign_up', {
          title: "Codeial | Sign Up"
      })
  }
  
  
  // render the sign in page
  module.exports.signIn = function(req, res){
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
    //steps to authenticate
    //find the user
    User.findOne({email:req.body.email})
    .then((user)=>{
         //handle user found
         if(user){

              //handle password which doesn't match
              if(user.password != req.body.password){

                 return res.redirect('back');
              }
              //handle session creation

              res.cookie('user_id',user.id);
              return res.redirect('/users/profile');
         }
         else{

             //handle user not found
               return res.redirect('back');
         }

    })
    .catch((err)=>{
        console.log('error in finding user in signing in',err);
        return;
    })
   }

   //creating sign-out  function

   module.exports.signOut = function(req, res) {
    const userId = req.cookies.user_id;
  
    // Clear the user_id cookie
    res.clearCookie('user_id');
  
    // Redirect the user to the sign-in page
    return res.redirect('sign-in');
  }