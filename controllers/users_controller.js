const User = require('../models/user');
//create controller for the profile
module.exports.profile = function (req,res){
    console.log(req.params.id);
      User.findById(req.params.id)

        .then((user)=>{
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
      })
         .catch((err)=>{
            console.log("error to finding users id");
            return res.redirect('back');
       })
    
 }

 module.exports.update = function(req,res){
       if(req.user.id == req.params.id){
           User.findByIdAndUpdate(req.params.id,req.body)
           .then(()=>{
              
            console.log("Updated Successfully....");
             return res.redirect('back');

           })
           .catch((err)=>{

             console.log("Error in finding id and update");
             return res.redirect('back');
           })
       }
       else{
          
           return res.status(401).send('Unauthorized');
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

  //create sign-out controller

  module.exports.destroySession = function(req,res,next){

     req.logout(function(err){
          if(err){
              return next(err);
          }

          return res.redirect('/')
     });
     

  }