
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
       interval:'1d',
       path:logDirectory,
});



const development = {
     
     name:'development',
     asset_path:'/assets',
     session_cookie_key:'something',
     db:'codeial_development',
     smtp:{       
          service:'gmail',
          host:'smtp.gmail.com',
          port:587,
          secure:false,
          auth:{
               user:'harishjadhav671@gmail.com',
               pass:'uufwashhsohikxyc'
          }
     },
      google_client_id:"561531590062-0oqi4vs461l3630ov91q8ieg7ihppqvc.apps.googleusercontent.com",
      google_client_secret:"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",
      google_call_back_url:"http://localhost:8000/users/auth/google/callback",
      jwt_secret_key:'codeial',

      morgan:{
          mode:'dev',
          Options:{stream: accessLogStream}
     }
}



const production ={
      
     name:'production',
     asset_path:'/assets',
     session_cookie_key:'something',
     db:'codeial_development',
     smtp:{       
          service:'gmail',
          host:'smtp.gmail.com',
          port:587,
          secure:false,
          auth:{
               user:'harishjadhav671@gmail.com',
               pass:'uufwashhsohikxyc'
          }
     },
      google_client_id:"561531590062-0oqi4vs461l3630ov91q8ieg7ihppqvc.apps.googleusercontent.com",
      google_client_secret:"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",
      google_call_back_url:"http://localhost:8000/users/auth/google/callback",
      jwt_secret_key:'codeial',

      morgan:{
           mode:'combined',
           Options:{stream: accessLogStream}
      }
}

module.exports = production;