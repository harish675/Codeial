
const User = require('../models/user');
const Friendship = require('../models/friendship');



module.exports.addFriend = async function (req,res){
    try{
        
         let senderId = req.query.sId;
         let receiverId = req.query.rId;
        

         //find the users and add this ids to each others list
        let removeFriend=false;
        let senderUser = await User.findById(senderId);
        let receiverUser = await User.findById(receiverId);

        //find exiting friendship
        let existingFriendship = await Friendship.findOne({
            from_user:senderId,
            to_user:receiverId,
        });
        console.log('existingFriendship',existingFriendship);

        if(existingFriendship){
            //remove exiting friendship btn users
            senderUser.friendships.pull(existingFriendship._id);
            senderUser.save();
            await senderUser.deleteOne({
                 _id:existingFriendship._id
            });
            
            receiverUser.friendships.pull(existingFriendship._id);
            receiverUser.save();
            await receiverUser.deleteOne({
                 _id:existingFriendship._id
            });
            removeFriend = true; 
        }
        else{
             
            //create new friendship  
            let newFriendship = await  Friendship.create({
                 from_user:senderId,
                 to_user:receiverId,
            })
            
            senderUser.friendships.push(newFriendship._id);
            senderUser.save();
            receiverUser.friendships.push(newFriendship._id);
            receiverUser.save();  

            console.log('newFriendship',newFriendship);
        }
    //     return res.json(200, {
    //         message: 'Request Successful',
    //         data: {
    //           deleted: deleted,
    //         },
    //   });
          
       return res.redirect('back');
    }
    catch(err){
        // console.log(err);
        //         return res.json(500, {
        //           message: 'Internal Server Error',
        //         });
        
         console.log(err);
         return res.redirect('back');
    }

}