 const express =  require('express');

const userController = require('../controllers/users_controller');


const router = express.Router();

 router.get('/profile',userController.profile);
 
 router.get('/signin',userController.SignIn);
 router.get('/signup',userController.SignUp);
 
 router.post('/create',userController.create);
 


 module.exports=router;