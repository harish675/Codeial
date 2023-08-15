class ChatEngine {
     constructor(chatBoxId, userEmail) {
         this.chatBox = $(`#${chatBoxId}`);
         this.userEmail = userEmail;
 
         // Use the socket.io-client library to connect to the server
         this.socket = io.connect('http://localhost:3000', {
             transports: ['websocket'], // Use only WebSocket transport for compatibility
         });
 
         if (this.userEmail) {
             this.connectionHandler();
         }
     }
 
     connectionHandler() {
         this.socket.on('connect', () => {
             console.log('Connection established using sockets...!');
         });
     }
 }
 
 // Export the ChatEngine class if needed
 // module.exports = ChatEngine;
 