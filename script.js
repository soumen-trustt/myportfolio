document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
  
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  
   document.getElementById("response").innerHTML = "Thank you for your message! your message has been recieved.You will be called soon";
  });
  