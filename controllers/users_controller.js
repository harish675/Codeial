const User = require('../models/user');
//create controller for the profile
module.exports.profile = async function (req,res){
    console.log(req.params.id);
      try{
         let user = User.findById(req.params.id)
          .then((user)=>{
            console.log('profile user id:',user.id);
              res.render('profile',{         
                   title : "Codeial | profile",
                   profile_user:user,
              });

          })
          .catch((err)=>{
                console.log("Error in finding the user");
                return res.redirect('back');
          })
        //   console.log('******',req.params.id);  
        //   console.log('profile user id:',user.id);
        //   console.log('user',user.name);
        //   if(user){
        //      res.render('profile',{         
        //      title : "Codeial | profile",
        //      profile_user:user,
        //    });
        //  }
        //   else{

        //    console.log("user is not found in the list");
        //    return redirect('back');
        // }
      
        }catch(err){
            console.log('Error',err);
            return;
      }
      
}
module.exports.update = async function(req,res){
      
      // try{
      //     if(req.user.id == req.params.id){
      //       await User.findByIdAndUpdate(req.params.id,req.body);
      //       req.flash('success','profile details updated successfully');
      //         return res.redirect('back');
      //     }
      //   else{
      //       req.flash('error','error in updating');
      //       return res.status(401).send('Unauthorized');
      //    }       
      // }
      // catch(err){
      //    req.flash('success','profile does not update');
      //     return;
      // }

      try{
        if(req.user.id == req.params.id){
          let user =await User.findById(req.params.id);
          User.uploadedAvatar(req,res,function(err){
             if(err){
                 console.log("****Multer Error******",err);
             }
             console.log(req.file);
             user.name = req.body.name;
             user.email=req.body.email;

             if(req.file){
                //this is saving the path of the uploaded file into the avatar filed in the user
                user.avatar = User.avatarPath+'/'+req.file.filename;
             }
             user.save();
             return res.redirect('back');
          })
        }
      else{
          req.flash('error','error in updating');
          return res.status(401).send('Unauthorized');
       }       
    }
    catch(err){
       req.flash('success','profile does not update');
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
                req.flash('success','User successfully created');
                return res.redirect('/users/sign-in');
              }
            else{
              req.flash('email id all ready present');
              return res.redirect('/users/sign-in');
             }
      }
      catch{
              req.flash('error','user does not created');
              return res.redirect('back');
       }
}
  
  
  // sign in and create a session for the user
  module.exports.createSession = function(req, res){
      
       req.flash('success','Logged in Successfully');
      return res.redirect('/');
  }

  //create sign-out controller

  module.exports.destroySession = function(req,res,next){
     req.logout(function(err){
          if(err){
              return next(err);
          }
          req.flash('success','You have logged out');
          return res.redirect('/')
     });
     
  }