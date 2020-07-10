$(document).ready(function(){
    $('#posaljiPodatke').click(proveriFormu);
    prikazBrojaProizvoda();
})

function prikazBrojaProizvoda(){

    if(localStorage){
  
      if(localStorage.getItem('proizvodi')){
  
        var niz = JSON.parse(localStorage.getItem('proizvodi'));
  
        if(niz.length != 0){
  
          var broj = niz.length;
  
          $('.brojProizvoda').html(broj);
  
          $('.brojProizvoda').css('display','block');
  
        }

        else{

            $('.brojProizvoda').html('0');

        }
  
      }
  
    }
  
  }

function proveriFormu(e){
    e.preventDefault();

    var tacnostForme = true;

    var ime = document.getElementById('ime').value;
    var prezime = document.getElementById('prezime').value;
    var mejl = document.getElementById('mejl').value;
    var message = document.getElementById('txtArea').value;
    var imeGr = document.getElementById('greskaNaImenu');
    var prezimeGr = document.getElementById('greskaNaPrezimenu');
    var mejlGr = document.getElementById('greskaNaMejlu');
    var tekstPorukaGr = document.getElementById('greskaNaTekstPoruka');

    var regularniIme = /^[A-ZČĆŠĐŽ][a-zčćžđš]{2,15}(\s[A-ZČĆŠĐŽ][a-zčćžđš]{2,15}){0,1}$/;
    var regularniPrezime = /^[A-ZČĆŠĐŽ][a-zčćžđš]{2,15}(\s[A-ZČĆŠĐŽ][a-zčćžđš]{2,15}){0,1}$/;
    var regularniMejl = /^[a-zčćžđš][a-z\d\-\.\wčćžđš]+\@[a-z]+(\.[a-z]{2,12}){1,2}$/
    var regularniMessage = /^[A-z\.\,\s\w\d\t\nčćžđš\/\@]+$/

    function pokaziGresku(promenljiva, izraz, idPoruke){

        if (!izraz.test(promenljiva)){
            tacnostForme = false;
            idPoruke.style.visibility = 'visible';
        }

        else {
            idPoruke.style.visibility = 'hidden';
        }

    }

    pokaziGresku(ime, regularniIme, imeGr);
    pokaziGresku(prezime, regularniPrezime, prezimeGr);
    pokaziGresku(mejl, regularniMejl, mejlGr);
    pokaziGresku(message, regularniMessage, tekstPorukaGr);

    var izbor = document.getElementById('biraj').value;

    if(izbor == '0'){
        tacnostForme = false;
        document.getElementById('greskaNaIzboru').style.visibility = 'visible';
    }

    else{
        document.getElementById('greskaNaIzboru').style.visibility = 'hidden';
    }

    if(tacnostForme == true){
        document.getElementById('nijeGreska').style.visibility = 'visible';
    }

    else{
        document.getElementById('nijeGreska').style.visibility = 'hidden';
    }


}