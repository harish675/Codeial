 const express =  require('express');

const userController = require('../controllers/users_controller');
const postController = require ('../controllers/post_controller');
const router = express.Router();

 router.get('/profile',userController.profile);
 router.get('/post',postController.post);

 module.exports=router;