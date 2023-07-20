
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true

    },
    function(req,email,password,done){
        //find the user and create identity
        User.findOne({email:email})
        .then((user)=>{

            if(!user || user.password != password){
                req.flash('error','Invalid Username/Password');
                return done(null,false);
               }
        
            return done(null,user);
        })
        .catch((err)=>{
            req.flash('Error',err);
            return done(err);
        });
       
        // User.findOne({email:email},function(err,user){
        //       if(err){

        //         console.log('Error in finding the user --->Passport');
        //         return done(err);
        //       }
            
        //       //user is found  but wrong password
        //       if(!user || user.password != password){
        //          console.log('Invalid Username/Password');
        //          return done(null,false);
        //       }

        //       return done(null,user);

              
        // });
       
    }

));

/*done is callback function that takes two argument first err and 
doneor not that is ture or false */

//serializing to user decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
   return  done(null,user.id);
});

//deserializing the user from the key in the cookie
passport.deserializeUser(function(id,done){

    User.findById(id)
    .then((user)=>{
       return done(null,user);
    })
    .catch((err)=>{
        console.log("error in finding user ----> Passport");
        return done(err);
    })
      
    //  User.findById(id,function(err,user){
    //      if(err){
    //         console.log("error in finding user ----> Passport");
    //         return done(err);
    //      }

    //      return done(null,user);
    //  });
});

//check the user is authenticated

passport.checkAuthentication = function(req,res,next){
    
     //if the user is signed in ,then pass on the req to next function which controller action
     if(req.isAuthenticated()){
         return next();
     }

     //user is not sign in
     return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req,res,next){
    
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie we just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;