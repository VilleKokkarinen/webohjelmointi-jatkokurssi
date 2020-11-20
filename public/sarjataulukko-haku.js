var templates = {}; // samat kommentit pelaaja-joukkue-haku.js tiedostossa
 
function display_template(tmpl, data) { 
  console.log(data)
    if (templates[tmpl] === undefined) {
      jQuery.get("/" + tmpl + ".handlebars", function(resp) {
          templates[tmpl] = Handlebars.compile(resp);
          display_template(tmpl, data);
      });
      return;
    }
 
    var template = templates[tmpl];
    var html = template(data);
   $("#taulukko").html(html);
}
 

$(document).ready(function(){
    var name = 'sarjataulukko';
    $(document).on("click", ".view-sarjataulukko", function(e) {
      e.preventDefault();      
      $.get( "/sarjataulut", function() {         
      })
        .done(function(response) {
          display_template(name, {array: response});
        })
        .fail(function() {
          alert( "error" );
        })     
  })
})