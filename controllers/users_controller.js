const User = require('../models/user');
//create controller for the profile
module.exports.profile = function (req,res){
     
      res.render('profile',{         
            title : "Codeial | profile"
      });
 }

 //create controller for the sign in page
module.exports.SignIn = function (req,res){
     
      res.render('user_sign_up',{         
            title : "Codeial | Sign Up"
      });
    
 }

//create controller for the sign up page
module.exports.SignUp = function (req,res){
     
     res.render('user_sign_in',{         
           title : "Codeial | Sign In"
     });
   
};


//get the sign up data

module.exports.create = function(req,res){
      
      if(req.body.password != req.boy.confirm_password){
            return  res.redirect('back');
      };

      User.findOne({
            email:req.body.email
      },function(err,user){

            if(err){
                  console.log("error in finding user in signing up");
                  return;
            }
            if(!user){
                  User.create(req.body,function(err,user){
                        if(err){
                              console.log("error in creating user");
                        }
                        return res.redirect('/users/sign_in');
                  })
            }else{

                  return res.redirect('back');
            }
      });
      

}

//sign in and create session for the user
module.exports.createSession = function(req,res){
       //todo later
}