const express =  require('express');
const router = express.Router();
const passport = require('passport');


const commentController = require('../controllers/comments_controller');

console.log("comments router called");
router.post('/create',passport.checkAuthentication,commentController.create);


module.exports = router;