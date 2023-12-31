const express = require('express');
const env = require('./config/environment');
const morgan =require('morgan');
const cookieParser = require('cookie-parser');
const app =express();
require('./config/view-helpers')(app);
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose') ;
//used for session cookie
const session = require('express-session');
const passport =require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');



const passportGithub = require('./config/passport-github-oauth2-strategy');

const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

//need to include later on 
//saas middleware
// const sassMiddleware = require('node-sass');

// app.use(sassMiddleware(
//   {
//     src:'assets/scss',
//     dest:'/assets/css',
//     debug:true,
//     outputStyle:'extended',
//     prefix:'/css'
//    }
// ));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//set the  view engine
app.set('view engine','ejs');
app.set('views','./views');

// create a new instance of connect-mongo and pass the session object
const store = MongoStore.create({
   mongoUrl: 'mongodb://127.0.0.1/codeial_development',
 });
 store.on('error', function (error) {
   // handle initial error from connect-mongo
   console.log('Error in connect-mongo:', error);
 });


// session middleware configuration
app.use(
   session({
     name: 'codeial',
     secret:env.session_cookie_key,
     saveUninitialized: false,
     resave: false,
     cookie: {
       maxAge: 1000 * 60 * 100
     },
     store: store // use the store instance
   })
 );

// //mango store is used to store the session cookie in the db 
// app.use(session({
//     name: 'codeial',
//    secret: 'something',
//    saveUninitialized: false,
//    reSave: false,
//    cookie: {
//      maxAge: 1000 * 60 * 100,
//    },

//    store : new MongoStore(
//       {
//          mongooseConnection:db,
//          autoRemove:'disabled',

//       },

//       function (err){
//          console.log(err || 'connect mongo-DB setup ok');
//       }
//    )
//  }));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);
//use express router 
app.use('/',require('./routes'));
//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(morgan(env.morgan.mode,env.morgan.Options));


app.listen(port,function(err){

     if(err){
        
        console.log(`Error in running the server:${err}`); 
        //console.log('error',err);
     }

     console.log(`Server is running on port : ${port}`);
});
