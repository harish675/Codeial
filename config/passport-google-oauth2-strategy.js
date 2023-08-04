

const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../.../../models/user');

//tells to passport use a new strategy for google login
passport.use(new googleStrategy(
    { 
        clientID :"561531590062-0oqi4vs461l3630ov91q8ieg7ihppqvc.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8000/users/auth/google/callback"
     },
     function(accessToken,refreshToken,profile,done){
           //find the user
           User.findOne({email: profile.emails[0].value}).exec()
            .then((user)=>{
                console.log(profile);
                 if(user){
                    // if found set this user as req.user
                     return done(null,user);
                 }
                 else{
                   //if not found create the user and set is as req.user   
                      User.create({
                          name:profile.displayName,
                          email:profile.emails[0].value,
                          password:crypto.randomBytes(20).toString('hex')
                      })
                      .then((user)=>{
                            
                         return done(null,user);
                            
                      }).catch((err)=>{
                              console.log('error in creating user google strategy-passport',err);
                              return;
                      });
                 }  
                 
               

            }).catch((err)=>{
                 console.log('error in google strategy-passport',err);
                 return;
            });
           
           
     }

));

module.exports =passport;



