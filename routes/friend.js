
const express = require('express');
const router = express.Router();

const friendController = require('../controllers/friendship_controller');

router.get('./add',friendController.addFriend);


module.exports = router;