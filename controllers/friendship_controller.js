
const Friendship = require('../models/friendship');
const User = require('../models/user');



module.exports.addFriend = async function(req,res){
     
     const senderUserId = req.query.sId;
     const receiverUserId = req.query.rId;


     //check if the friendship  request already exists
     const existingRequest = await Friendship.findOne({
        from_user:senderUserId,
        to_user:receiverUserId,
        status:'pending'   
     });

     if(existingRequest){
          return res.status(400).json({
             message:'Friend request already sent.'
          });
     }
     
     //Create a new friendship req
     const newRequest = new Friendship({
        from_user:senderUserId,
        to_user:receiverUserId,
        status:'pending',  
     });

     await newRequest.save();
     
    return res.json({
         message:'Friend request sent successfully.'
    });
}