{
   // method to submit the from data for new Post using AJAX
    let createPost =function(){
          
          let newPostFrom = $('#new-post-from');
          
           newPostFrom.submit(function(e){
               e.preventDefault();

               $.ajax({
                     type: 'post',
                     url : '/post/create',
                       //serialize convert hour data into json
                     data:newPostFrom.serialize(),
                     success:function(data){
                           console.log(data);
                           
                       },
                       error:function(error){
                         console.log(error.responseText);
                      }
           });
        });
        
    }
     
    createPost();      
}

//method to create a post in DOM