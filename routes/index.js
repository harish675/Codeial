const express = require('express');
const homeController =require('../controllers/home_controller');
const router = express.Router();

console.log("router loaded");

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/post',require('./post'));



//for further routes,access from hear

//router.use('./routerName ,require('./users'));




module.exports = router;