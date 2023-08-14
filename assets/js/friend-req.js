$(document).ready(function(){
     $('.friend-req-toggle').click(function(event){
         event.preventDefault();
 
         const receiverId = $(this).data('receiver-id');
         const senderId = $(this).data('sender-id');
 
         // Perform AJAX request to send friend request
         $.ajax({
             type: 'POST',
             url: '/users/add-friend', // Use the correct URL for your server endpoint
             data: {
                 receiverId: receiverId,
                 senderId: senderId
             },
             success: function(response){
                 console.log(response.message);
             },
             error: function(error){
                 console.error('An error occurred while sending the friend request.');
             }
         });
     });
 });