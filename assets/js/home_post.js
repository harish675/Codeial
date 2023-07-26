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

                         let newPost = newPostDom(data.data.post);
                          
                         $('#post-display>ul').prepend(newPost);
                       },
                       error:function(error){
                         console.log(error.responseText);
                      }
           });
        });
        
    }
     
//method to create a post in DOM
 
 let newPostDom = function(post){
    
      return $(`<li id="post-${post._id}">
                  <div id="post-content">
                   
                  <small>
                    <a class="delete-post-button" href="/post/destroy/${post._id}">Delete</a>
                  </small>
                   
                  <p> ${post.user.name}</p>
                  <p>${post.content}</p>
                  <!-- Access user information -->
                  </div>
                  <div class="post-commnets">
                     
              
                            <form action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment...">
                                <input type="hidden" name="post" value="${post._id}">
                                <input type="submit" value="Add Comment">
                            </form>
              
                      <div class="post-comments-list">
                          <ul id="post-commnets-${post._id}">
                            
                          </ul>
                      </div>
                  </div>
                </li>
              `)
 }




     createPost();      
  }