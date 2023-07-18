 const express =  require('express');
 const passport = require('passport');
 const usersController = require('../controllers/users_controller');


const router = express.Router();

 router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
 router.get('/sign-up', usersController.signUp);
 router.get('/sign-in', usersController.signIn);
 

 router.post('/create', usersController.create);
 
 //use passport as middle where to authenticate 
 router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'users/sign-in'},
  ),usersController.createSession);
  
  
  router.get('/sign-out',usersController.destroySession);

 module.exports=router;