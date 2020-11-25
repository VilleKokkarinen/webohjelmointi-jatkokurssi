(function(){
    'use strict';

    var $myapp = {};
    self.$myapp = $myapp;
  
    $myapp.isValidHetu = function (hetu) {
        var heturegex = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([5-9]\d+|\d\d-|[01]\dA)\d{3}[\dA-Z]$/;
       
        if(heturegex.test(hetu) == true){
            console.log('oli validi regexin mukaan')
            return true;
        }
        else{
            console.log('ei ollut validi')
            return false;
        }
        
    };


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


      it('should validate a HETU', function () {
        // Valid HETU
        assert($myapp.isValidHetu('280199-978Y'));
        // Invalid HETU
        assert(!$myapp.isValidHetu('450199-978Y'));
      });

  })();