var templates = {};
 
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
    var name = 'pelaaja-joukkue';
    $(document).on("click", ".view-pelaaja-joukkue", function(e) {
      e.preventDefault();   

      $.get("/joukkueet", function() {         
      })
        .done(function(joukkueet) {
          $.get("/pelaajat", function() {         
          })
            .done(function(pelaajat) {
              display_template(name, {joukkueet: joukkueet, pelaajat: pelaajat});
            })
            .fail(function() {
              alert( "error" );
            })
        })
        .fail(function() {
          alert( "error" );
        })     
  })
})