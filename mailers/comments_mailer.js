const nodemailer = require('../config/nodemailer');


//this is another way of exporting a method
exports.newComment = (comment)=>{
     
       nodemailer.transporter.sendMail({
            
          from:'harishjadhav671@gmail.com',
          to:comment.user.email,
          subject:"new Comment Published!",
          html:'<h1>Yup , your comment is now published</h1>'
       },(err,info)=>{
         if(err){
             console.log('********Error in sending mail******',err);
             return;
         }
         console.log("Message sent",info);
         return;
       });
}