
$(document).ready(function(){
    $('.burgerMeni').click(function(){
        $('.meniSaStrane').toggleClass('meniPrikazan');
      })
      $('.meniSaStrane a').click(function(){
        if($(this).html()=="Proizvodi na akciji" || $(this).html()=="Kontakt"){
          $('.meniSaStrane').removeClass('meniPrikazan');
        }
      })
})
window.onload=function()
{
    $.ajax({
    url:"files/data/proizvodi.json",
    method:"GET",
    type:"json",
    success:function(data){
        ispisproizvoda2(data);
    },
    error:function(er){
        console.log(er);
    }

})

prikazBrojaProizvoda();

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

$.ajax({

    url : "files/data/vrste.json",
    method : "GET",
    type : 'json',
    success : function(data){

        console.log(data);
        ispisiDropdownListu(data);

    }

})
var element=document.querySelector(".cola a");
console.log(element);
element.addEventListener("click",function(e){
    e.preventDefault();
    var taj=document.getElementsByClassName("proizvodi2");
    console.log(taj);
    for(let i=0;i<taj.length;i++){
    taj[i].style.width="45%";
    taj[i].style.height="700px";
}
})
var element2=document.querySelector(".colb a");
element2.addEventListener("click",function(e){
    e.preventDefault();
    var taj=document.getElementsByClassName("proizvodi2");
    for(let i=0;i<taj.length;i++){
        taj[i].style.width="15%";
        taj[i].style.height="400px";
    }
})
$(document).on('change','#birajPice',filteri);

$(document).on('change','.cenaBiraj',filteri);

$(document).on('change','#sortiranje',filteri);

document.getElementById("search").addEventListener("keyup",filterpretraga);
 function filterpretraga(){
    let unos=this.value;
         $.ajax({
        url:"files/data/proizvodi.json",
         method:"GET",
         type:"json",
         success:function(data){
             let filtrirano=data.filter(x =>{
                 if(x.naziv.toLowerCase().indexOf(unos.toLowerCase())!== -1){
                     return true;
                 }
                 if(x.opis.toLowerCase().indexOf(unos.toLowerCase())!== -1){
                     return true;
                 }
                 if(x.kategorija.vrsta.toLowerCase().indexOf(unos.toLowerCase())!==-1){
                    return true;
                 }
             })
             ispisproizvoda2(filtrirano);
         },
         error:function(er){
             console.log(er);
         }
    
    })
 }
       
       
        function ispisiDropdownListu(data){

            var ispisi = '<select name="vrstaPica" id="birajPice"><option value="0">Izaberi</option>';
        
            for(let i of data){
        
                ispisi += `<option value="${i.idKat}">${i.naziv}</option>`;
        
            }
        
            ispisi += `</select>`;
        
            document.querySelector('.kategorije').innerHTML = ispisi;
        
        }
        
        function ispisproizvoda2(niz){
            let ispis="";
            for(let x of niz){
                ispis+=`<div class="proizvodi2">
                <img src="${x.slika.url}" alt="${x.slika.alt}"/>
                <h2>${x.naziv}</h2>
                <p>${x.opis}</p>
                <p>${x.kolicina}L</p>
                <div class="cene"><strong><p>${x.cene.trenutna} RSD&nbsp&nbsp&nbsp</p></strong>`;
                if(x.popust>0){
                  ispis+=`<del>${x.cene.stara}RSD</del></div>
                  <p class="bojapop">${x.popust}% popusta</p>`
                }
                else{
                    ispis+="</div>"}
                if(x.novo){
                    ispis+=`<p class="bojasamo">Novo</p>`
                }
                
                ispis+=`<div class="drzacdugme item_add single-item">
                  <button type="button" data-id=${x.id} value="Add to cart"class="dugme dugmeP button btn add-to-cart" ><i class="fa fa-shopping-cart"></i><p>Dodaj</p></button>
                  </div>
            </div>`
        }
            document.querySelector("#prodavnica").innerHTML=ispis;
            $(".dugmeP").on('click',addToCart);
        }

        function addToCart(){

            var id = this.dataset.id;

            var niz;

            if(localStorage.getItem('proizvodi')){

                niz = JSON.parse(localStorage.getItem('proizvodi'));

            }

            else{

                niz = [];

            }

            $.ajax({

                url : "files/data/proizvodi.json",
                method : "GET",
                dataType : 'json',
                success: function(data){

                    if(localStorage.getItem('proizvodi')){

                        var trenutni = JSON.parse(localStorage.getItem('proizvodi'));
                        
                        var brandNew = [];

                        var i = 0;

                            trenutni.filter(function(el){

                                if(el.id == id){
    
                                    i++;
    
                                }
    
                            })

                            console.log(i)

                            if(i != 0){

                                trenutni.filter(function(el){

                                    if(el.id == id){

                                        el.kolicina += el.kolicina;

                                        console.log(el.kolicina)

                                        console.log(el)

                                    }

                                })

                                console.log(trenutni)

                                localStorage.setItem('proizvodi', JSON.stringify(trenutni));

                            }

                            else{

                                data.filter(function(el){

                                if(el.id == id){
        
                                    niz.push(el);
        
                                }
        
                                })
        
                                localStorage.setItem('proizvodi', JSON.stringify(niz));

                            }
                        
                        
                        console.log(trenutni);

                    }

                    else{

                        data.filter(function(el){

                            if(el.id == id){
    
                                niz.push(el);
    
                            }
    
                        })
    
                        localStorage.setItem('proizvodi', JSON.stringify(niz));

                    }

                    prikazBrojaProizvoda();

                }

            })    



        }
        
        
        function filteri(){
        
            var valDrop = document.getElementById('birajPice').value;
        
            var opsegCena = document.getElementsByName('cena');
        
            var sortiraj = document.getElementById('sortiranje').value;
        
            var valOpsegCena;
        
            for(let i = 0 ; i < opsegCena.length ; i++){
        
                if(opsegCena[i].checked){
        
                    valOpsegCena = opsegCena[i].value;
        
                }
        
            }
        
            if(valOpsegCena == undefined){
        
                valOpsegCena = 0;
        
            }
        
            console.log(valDrop);
        
            console.log(valOpsegCena);
        
            var nizPica;
        
            var picaAkoImaOpseg;
        
            var picaAkoNemaDrop;
        
            console.log(picaAkoImaOpseg);
        
            console.log(sortiraj);
        
            $.ajax({
        
                url:"files/data/proizvodi.json",
                method:"GET",
                type:"json",
                success:function(data){
                    
                    if(valDrop != 0){
        
                                console.log('radi')
        
                                nizPica = data.filter(el => {
        
                                    if(valDrop == el.kategorija.idKat){
        
                                        console.log(el.kategorija.idKat);
        
                                        return el;
        
                                    }
        
                                })
        
                                console.log(nizPica);
                                if(valOpsegCena=="0"){
                                    picaAkoImaOpseg=nizPica;
                                }
        
                                if(valOpsegCena == '1'){
        
                                    picaAkoImaOpseg = nizPica.filter(el => {
        
                                        if(el.cene.trenutna <= 100)return el;
        
                                    })
        
                                    console.log(nizPica);
        
                                }
        
                                if(valOpsegCena == '2'){
        
                                    picaAkoImaOpseg = nizPica.filter(el => {
        
                                        if(el.cene.trenutna > 100 && el.cene.trenutna <= 500)return el;
        
                                    })
        
                                    console.log(nizPica);
        
                                    console.log(picaAkoImaOpseg);
        
                                }
        
                                if(valOpsegCena == '3'){
        
                                    picaAkoImaOpseg = nizPica.filter(el => {
        
                                        if(el.cene.trenutna > 500 && el.cene.trenutna <= 1000)return el;
        
                                    })
        
                                    console.log(nizPica);
        
        
                                }
        
                                if(valOpsegCena == '4'){
        
                                    picaAkoImaOpseg = nizPica.filter(el => {
        
                                        if(el.cene.trenutna > 1000 && el.cene.trenutna <= 3000)return el;
        
                                    })
        
                                    console.log(nizPica);
        
                                }
        
                                if(valOpsegCena == '5'){
        
                                    picaAkoImaOpseg = nizPica.filter(el => {
        
                                        if(el.cene.trenutna > 3000)return el;
        
                                    })
        
                                    console.log(nizPica);
        
                                }
        
                                if(picaAkoImaOpseg != undefined){
        
                                    if(sortiraj == '1'){
        
                                        picaAkoImaOpseg.sort((a,b) => {
        
                                            if(a.naziv > b.naziv)return 1;
                                            if(a.naziv < b.naziv) return -1;
                                            if(a.naziv == b.naziv)return 0;
        
                                        })
        
                                    }
        
                                    if(sortiraj == '2'){
        
                                        picaAkoImaOpseg.sort((a,b) => {
        
                                            if(a.naziv > b.naziv)return -1;
                                            if(a.naziv < b.naziv) return 1;
                                            if(a.naziv == b.naziv)return 0;
        
                                        })
        
                                    }
        
                                    if(sortiraj == '3'){
        
                                        picaAkoImaOpseg.sort((a,b) => {
        
                                            if(a.cene.trenutna > b.cene.trenutna)return -1;
                                            if(a.cene.trenutna < b.cene.trenutna) return 1;
                                            if(a.cene.trenutna == b.cene.trenutna)return 0;
        
                                        })
        
                                    }
        
                                    if(sortiraj == '4'){
        
                                        picaAkoImaOpseg.sort((a,b) => {
        
                                            if(a.cene.trenutna > b.cene.trenutna)return 1;
                                            if(a.cene.trenutna < b.cene.trenutna) return -1;
                                            if(a.cene.trenutna == b.cene.trenutna)return 0;
        
                                        })
        
                                    }
        
                                    ispisproizvoda2(picaAkoImaOpseg);
                                }
                                console.log(nizPica);
        
                    }
        
                    else{
                        if(valOpsegCena =='0'){
                            picaAkoNemaDrop=data;
                        }
                        if(valOpsegCena == '1'){
        
                            picaAkoNemaDrop = data.filter(el => {
        
                                if(el.cene.trenutna <= 100)return el;
        
                            })
        
                            console.log(nizPica);
                        }
        
                        if(valOpsegCena == '2'){
        
                            picaAkoNemaDrop = data.filter(el => {
        
                                if(el.cene.trenutna > 100 && el.cene.trenutna <= 500)return el;
        
                            })
        
                            console.log(nizPica);
        
                            console.log(picaAkoImaOpseg);
        
                        }
        
                        if(valOpsegCena == '3'){
        
                            picaAkoNemaDrop = data.filter(el => {
        
                                if(el.cene.trenutna > 500 && el.cene.trenutna <= 1000)return el;
        
                            })
        
                            console.log(data);
                        }
        
                        if(valOpsegCena == '4'){
        
                            picaAkoNemaDrop = data.filter(el => {
        
                                if(el.cene.trenutna > 1000 && el.cene.trenutna <= 3000)return el;
        
                            })
        
                            console.log(nizPica);
                        }
        
                        if(valOpsegCena == '5'){
        
                            picaAkoNemaDrop = data.filter(el => {
        
                                if(el.cene.trenutna > 3000)return el;
        
                            })
                            
        
                            console.log(nizPica);
                        }
        
                        if(picaAkoNemaDrop != undefined){
        
                            if(sortiraj == '1'){
        
                                picaAkoNemaDrop.sort((a,b) => {
        
                                    if(a.naziv > b.naziv)return 1;
                                    if(a.naziv < b.naziv) return -1;
                                    if(a.naziv == b.naziv)return 0;
        
                                })
        
                            }
        
                            if(sortiraj == '2'){
        
                                picaAkoNemaDrop.sort((a,b) => {
        
                                    if(a.naziv > b.naziv)return -1;
                                    if(a.naziv < b.naziv) return 1;
                                    if(a.naziv == b.naziv)return 0;
        
                                })
        
                            }
        
                            if(sortiraj == '3'){
        
                                picaAkoNemaDrop.sort((a,b) => {
        
                                    if(a.cene.trenutna > b.cene.trenutna)return -1;
                                    if(a.cene.trenutna < b.cene.trenutna) return 1;
                                    if(a.cene.trenutna == b.cene.trenutna)return 0;
        
                                })
        
                            }
        
                            if(sortiraj == '4'){
        
                                picaAkoNemaDrop.sort((a,b) => {
        
                                    if(a.cene.trenutna > b.cene.trenutna)return 1;
                                    if(a.cene.trenutna < b.cene.trenutna) return -1;
                                    if(a.cene.trenutna == b.cene.trenutna)return 0;
        
                                })
        
                            }
        
                            ispisproizvoda2(picaAkoNemaDrop);
                        }
        
                    }
        
                },
                error:function(er){
                    console.log(er);
                }
            
            })
        
        }
        
 }