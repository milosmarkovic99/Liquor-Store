$(document).ready(function(){

    if(localStorage){

        if(localStorage.getItem('proizvodi')){

            var niz = JSON.parse(localStorage.getItem('proizvodi'));

            if(niz.length == 0){

                $("#content h1").html('Nemate proizvoda u korpi trenutno');

                $('.brojProizvoda').html('0');

                $('.confirm').css('display','none');

            }

            else{

                ispisiDivove(niz);

                var broj = niz.length;

                $('.brojProizvoda').css('display','block');

                $('.brojProizvoda').html(broj);

            }

        }

        else{

             $("#content h1").html('Nemate proizvoda u korpi trenutno');

        }

    }

    var niz = JSON.parse(localStorage.getItem('proizvodi'));

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

function ispisiDivove(proizvodi) {
    let html = `
    <div class="primer">
    <div class="drzanje">
     <h2>Slika</h2>
    <h2>Naziv</h2>
    <h2>Cena</h2>
    <h2>Količina(litraža)</h2>
    <h2>Ukupno</h2>
    <h2>Uklonite</h2>
    </div>
    `;
    let sveukupno=0;          
    for(let p of proizvodi) {
        html += ispisiPp(p);
        sveukupno+= p.kolicina*p.cene.trenutna;
    }

    html +=`<div class="cenaUkupna"><h2>Ukupno:</h2><p>${sveukupno} rsd</p></div></div><button id='confirmButton' class="confirm">Naruči</button>
    <p id='succPar'>Uspešno poručeno !</p>`;

    $("#content").html(html);

    $('.confirm').on('click',function(){

        $('#succPar').css('display','block')

    })

    function ispisiPp(p) {
       return  `<div class="upisivanje">
       <img class="pro" src="files/images/${p.slika.url}" alt="${p.slika.alt}"/>
       <p>${p.naziv}</p>
       <p>${p.cene.trenutna} rsd</p>
       <p>${p.kolicina}</p>
       <p>${p.kolicina* p.cene.trenutna} rsd</p>
       <div class="rem">
        <div><button  class="remove" onclick='ukloniIzKopre(${p.id})'>Uklonite</button> </div>
    </div>
   </div>`
    }
}
function proizvodiukorpi() {
    return JSON.parse(localStorage.getItem("proizvodi"));
}
function ukloniIzKopre(id) {

    let proizvodi = proizvodiukorpi();

    var novi = proizvodi.filter(p => p.id != id);

    console.log(novi);

    ispisiDivove(novi);

    localStorage.setItem("proizvodi", JSON.stringify(novi));

    prikazBrojaProizvoda();

    $('#succPar').css('display','none');

    var proz = JSON.parse(localStorage.getItem('proizvodi'));

    if(proz.length == 0){

        $('.confirm').css('display','none');

    }

}