
const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({

      content :{
          type:String,
          required:true,  
      },
      user:{
  
         //linking to the user
         type:mongoose.Schema.Types.ObjectId,
         ref:'User'
      },
      //includes the array of the ids of all comments in this post schema itself
      comments :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment",
        }
      ],

      likes :[
          {
             type:mongoose.Schema.Types.ObjectId,
             ref:'Like'
          }
      ]
     
},{

    timestamps:true, 
});

const Post = mongoose.model('Post',postSchema);
module.exports=Post;