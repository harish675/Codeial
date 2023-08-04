const passport = require('passport');
const githubStrategy = require('passport-github').Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//tells passport to use a new strategy for github login

passport.use(new githubStrategy({
     
    clientID:"bc6515d2b479bad18d5c",
    clientSecret:"41b5ae101bf81502bbd49080e01710435f137dad",
    callbackURL:"http://localhost:8000/users/auth/github/callback"
},
function(accessToken,refreshToken,profile,done){
       
     //find the user
     User.findOne({email:profile.email}).exec()
      
     .then((User)=>{
        console.log(profile);
        
        if(!user){
             // if found set this user as req.user
               return done(null,user);
        }
        else{
            //if not found create the user and set is as req.user   
               User.create({
                   name:profile.displayName,
                   email:profile.email,
                   password:crypto.randomBytes(20).toString('hex')
               })
               .then((user)=>{
                     
                  return done(null,user);
                     
               }).catch((err)=>{
                       console.log('error in creating user github strategy-passport',err);
                       return;
               });
          }      

     }).catch((err)=>{
        console.log('error in creating user github strategy-passport',err);
        return;
     });
      
     
}
))
