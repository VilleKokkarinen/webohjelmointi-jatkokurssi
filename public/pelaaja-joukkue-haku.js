var templates = {}; // valmiit templatet muistissa
 
function display_template(tmpl, data) { 
    if (templates[tmpl] === undefined) { // jos ei ole ennestään tehtynä, tehdään uusi.
      jQuery.get("/" + tmpl + ".handlebars", function(resp) {
          templates[tmpl] = Handlebars.compile(resp);
          display_template(tmpl, data);
      });
      return;
    }
 
    var template = templates[tmpl]; // napataan tämä kaikista templateista
    var html = template(data); // lisää datan siihen
   $("#taulukko").html(html); // vaihtaa taulukko nimisen elementin sisällön
}
 

$(document).ready(function(){
    var name = 'pelaaja-joukkue';
    $(document).on("click", ".view-pelaaja-joukkue", function(e) { // klikki eventti
      e.preventDefault(); // ei tarvitse tehdä mitään sillä linkillä, ns. tehdään linkistä nappi

      $.get("/joukkueet", function() { // haetaan restiltä joukkueet
      })
        .done(function(joukkueet) {
          $.get("/pelaajat", function() { // haetaan restiltä pelaajat    
          })
            .done(function(pelaajat) { // tungetaan molemmat template funktioon
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