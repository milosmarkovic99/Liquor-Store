
$(document).ready(function(){
    $('.slajder').slick({
  
  autoplay: true,
  autoplaySpeed: 2000,
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
    });
    $('.burgerMeni').click(function(){
      $('.meniSaStrane').toggleClass('meniPrikazan');
    })
    $('.meniSaStrane a').click(function(){
      if($(this).html()=="Proizvodi na akciji" || $(this).html()=="Kontakt"){
        $('.meniSaStrane').removeClass('meniPrikazan');
      }
    })
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


window.onload=function(){
  $.ajax({
      url:"files/data/proizvodi.json",
      method:"GET",
      type:"json",
      success:function(data){
      ispisproizvoda(data);
      dodavanjelistenera();
      prikazBrojaProizvoda();
      },
      error:function(er){
          console.log(er);
      }
  })
  function ispisproizvoda(niz){
  let ispis="";
      for(let x of niz){
          if(x.akcija){
          
          ispis+=`<div class="proizvod`;
          if(x.id>1){ispis+=` linija`};
          ispis+=`">
          <img src="${x.slika.url}" alt="${x.slika.alt}"/>
          <h2>${x.naziv}</h2>
          <p>${x.opis}</p>
          <p>${x.kolicina}L</p>
          <div class="cene"><strong><p>${x.cene.trenutna} RSD&nbsp&nbsp&nbsp</p></strong>`;
          if(x.popust){
            ispis+=`<del>${x.cene.stara}RSD</del></div>
            <p class="bojapop">${x.popust}% popusta</p>`
          }
          ispis+=`<div class="drzacdugme item_add single-item">
            <button type="button" data-id="${x.id}" name="dugmence" class="dugme button btn add-to-cart" value="Add to cart"><i class="fa fa-shopping-cart"></i><p>Dodaj</p></button>
            </div>
      </div>`
  }}
  document.querySelector("#akcijapr").innerHTML=ispis;
  }
  
function dodavanjelistenera(){
let rr=document.getElementsByClassName("dugme button btn add-to-cart");
for(let x=0;x<rr.length;x++){
  rr[x].addEventListener("click",dodajukorpu);
}
  }
  function proizvodiukorpi(){
    return JSON.parse(localStorage.getItem("proizvodi"));
  }
  function dodajukorpu(){
    let id=$(this).data("id");
    var proizvodi=proizvodiukorpi();
    if(proizvodi){
      if(proizvodi.filter(pr=>pr.id==id).length){
       for(let i in proizvodi)
       {
                   if(proizvodi[i].id==id)
                   {
                      proizvodi[i].kolicina++;
                      break;
                   }
       }
       localStorage.setItem("proizvodi",JSON.stringify(proizvodi));;
      }
      else{
       proizvodi.push({
       id:id,
       kolicina:1
  });
  localStorage.setItem("proizvodi",JSON.stringify(proizvodi));
      }
    }
    else
       {
       proizvodi=[];
              proizvodi[0]=
              {
                id:id,
                kolicina:1
               };
       localStorage.setItem("proizvodi",JSON.stringify(proizvodi));
       }
       prikazBrojaProizvoda();
    }
  }