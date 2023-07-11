
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
    },
    function(email,password,done){
        //find the user and create identity
       
        User.findOne({email:email},function(err,user){
              if(err){

                console.log('Error in finding the user --->Passport');
                return done(err);
              }
            
              //user is found  but wrong password
              if(!user || user.password != password){
                 console.log('Invalid Username/Password');
                 return done(null,false);
              }

              return done(null,user);

              
        });
       
    }

));

/*done is callback function that takes two argument first err and 
doneor not that is ture or false */

//serializing to user decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookie
passport.deserializeUser(function(id,done){
      
     User.findById(id,function(err,user){
         if(err){
            console.log("error in finding user ----> Passport");
            return done(err);
         }

         return done(null,user);
     });
});

module.exports = passport;