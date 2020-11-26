var $myapp = {};
    self.$myapp = $myapp;
  
    $myapp.isValidHetu = function (hetu) {
        var heturegex = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([5-9]\d+|\d\d-|[01]\dA)\d{3}[\dA-Z]$/;
       
        /* regexi purettu "suomeksi"
        * ^ = alku
        *
        * (0[1-9]|[12]\d|3[01])
        * = mikä tahansa numero 01-31 (kuukauden pvm)
        * 
        * (0[1-9]|1[0-2])
        * = mikä tahansa numero 01-12 (kuukausi)
        * 
        * ([5-9]\d+|\d\d-|[01]\dA)
        * = vuosiluku = numerot 00-99
        * ja vuosisata
        * = joku: ['+', '-', 'A']
        * 
        * \d{3}[\dA-Z]$
        * = tarkistusmerkki, eli numero 0-9 tai kirjain A-Z
        * 
        * 
        * => 5 testiä yhdessä paketissa
        */
        
        if(heturegex.test(hetu) == true)
            return true;        
        else return false;
    };



    function onNumero(numero){
      return !Number.isNaN(numero);
    }
    function onNumeroTyyppi(numero){
      const type = typeof(numero);

      if(type == "number")
        return true;
      else return false;
    }

    function toiseenPotenssiin(value){
      var newObject = JSON.parse(JSON.stringify(value));
      const result = Math.pow(value, 2);

      if(newObject*newObject == result)
        return true;
      else return false;
    }

    $myapp.isValidToiseenPotenssiin = function(value){
      const arvoOnNumero = onNumero(value);
      const arvoOnNumeroTyyppia = onNumeroTyyppi(value);
      const loppuarvoOnPotenssiinKaksi = toiseenPotenssiin(value);

      if(arvoOnNumero &&
        arvoOnNumeroTyyppia &&
        loppuarvoOnPotenssiinKaksi)
      return true;
      else return false;
    }


$(document).ready(function(){

  console.clear();
  const numero = 5; // tai esim 1e+58 .

  it('checking provided numero', function () {
    // check numero
    assert($myapp.isValidToiseenPotenssiin(numero));
  });


  $(document).on("click", "#tarkistaHetu", function(e) { // klikki eventti
    e.preventDefault(); 
    const validihetu = '280199-978Y'
    const eivalidihetu = '450199-978Y'

    const hetu = $('#hetu').val();

    it('checking provided HETU', function () {
      // check HETU
      assert($myapp.isValidHetu(hetu));
    });

  })
})
    
    
    
    /**
     * test function
     * @param {string} desc
     * @param {function} fn
     */
    function it(desc, fn) {
      try {
        fn();
        console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + desc);
      } catch (error) {
        console.log('\n');
        console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc);
        console.error(error);
      }
    }

    function assert(isTrue) {
        if (!isTrue) {
          throw new Error();
        }
      }
      it('should fail', function() {
        assert(1 !== 1);
      });
      it('should pass', function() {
        assert(1 === 1);
      });