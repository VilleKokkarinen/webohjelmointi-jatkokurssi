$(document).ready(function(){
    $(document).on("click", "#LogOut", function(e) { // klikki eventti
      e.preventDefault(); 

      $.get("/logout", function() {
      })
        .done(function(response) {
          alert(response);
        })
        .fail(function() {
          alert( "error" );
        })     
  })
})