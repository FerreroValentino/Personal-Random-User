const body = document.body;
const toggleButton = document.querySelector('.theme-button');

//gestione temi
toggleButton.addEventListener('click', function(){
  body.classList.toggle('dark-mode');

  // toggleButton.innerHTML = body.classList.contains('dark-mode') ? '🌙' : '☀️';
  if(body.classList.contains('dark-mode')){
    // toggleButton.innerHTML = '&#x1F319;' 
    toggleButton.innerHTML = '🌙' 
    $("#container").removeClass("border-dark");
    $("#container").addClass("border-white");
    $("img").removeClass("border-dark");
    $("img").addClass("border-white");
    $("#scelte").removeClass("border-dark");
    $("#scelte").addClass("border-white");
  }
  else{
    // toggleButton.innerHTML = '&#x2600;&#xFE0F;'
    toggleButton.innerHTML = '☀️' 
    $("#container").removeClass("border-white");
    $("#container").addClass("border-dark");
    $("img").removeClass("border-white");
    $("img").addClass("border-dark");
    $("#scelte").removeClass("border-white");
    $("#scelte").addClass("border-dark");
  }
});

let card = document.getElementById("card")
let i = 0;
let tot = users.value;
let genere;
let nazione;
let dimensione = dim.value;

let params = {
  results: tot,
  gender: "all"
}
 
let promise = ajax.sendRequest("GET", "/api", params) // api?results=20&gender=male

$('#next').on("click", next);
$('#previous').on("click", previous);
$('#first').on("click", first);
$('#last').on("click", last);

$('#all').on("click", changeGender);
$('#male').on("click", changeGender);
$('#female').on("click", changeGender);

$('#users').on("change", changeUser);

$('#AU').on("change", changeNat);
$('#BR').on("change", changeNat);
$('#FR').on("change", changeNat);
$('#DE').on("change", changeNat);
$('#ES').on("change", changeNat);
$('#US').on("change", changeNat);

$('#dim').on("change", changeDim);


generateUser();

function generateUser() {
  $("#totale").text(`${i+1}/${tot}`);
  $("#nusers").text(`N Users: ${users.value}`);

  promise.catch(ajax.errore)
  promise.then(function (httpResponse) {
      let people = httpResponse.data.results
      $("#card").empty();

      let img = $("<img>");
      $("#card").append(img);
      img.addClass("border border-2 border-dark rounded-circle my-3");
      
      if(dimensione == "med"){
        img.attr("src", people[i].picture.medium);
      }
      else if(dimensione == "lar"){
        img.attr("src", people[i].picture.large);
      }
      else{
        img.attr("src", people[i].picture.thumbnail);
      }

      let p = $("<p></p>");
      $("#card").append(p);
      p.text(`Name: ${people[i].name.first}`);
      p.addClass("my-1");

      p = $("<p></p>");
      $("#card").append(p);
      p.text(`Surname: ${people[i].name.last}`);
      p.addClass("my-1");

      p = $("<p></p>");
      $("#card").append(p);
      p.text(`Gender: ${people[i].gender}`);
      p.addClass("my-1");


      p = $("<p></p>");
      $("#card").append(p);
      p.text(`Country: ${people[i].location.country}`);
      p.addClass("my-1");      

      p = $("<p></p>");
      $("#card").append(p);
      p.text(`State: ${people[i].location.state}`);
      p.addClass("my-1");

      p = $("<p></p>");
      $("#card").append(p);
      p.text(`Age: ${people[i].dob.age}`);
      p.addClass("my-1");

      p = $("<p></p>");
      $("#card").append(p);
      p.text(`Cell: ${people[i].cell}`);
      p.addClass("my-1");      

      p = $("<p></p>");
      $("#card").append(p);
      p.text(`Nat: ${people[i].nat}`);
      p.addClass("my-1");
  })

  if(i == tot - 1){
    $('#next').prop("disabled", true);
    $('#last').prop("disabled", true);
  }
  else{
    $('#next').prop("disabled", false);
    $('#last').prop("disabled", false);
  }

  if(i == 0){
    $('#previous').prop("disabled", true);
    $('#first').prop("disabled", true);
  }
  else{
    $('#previous').prop("disabled", false);
    $('#first').prop("disabled", false);
  }
}

function changeGender(){
  if(all.checked){
    genere = "all";
  }
  else if(male.checked){
    genere = "male";
  }
  else{
    genere = "female";
  }

  i = 0;

  params = {
    results: tot,
    gender: genere,
    nat: nazione
  }
  promise = ajax.sendRequest("GET", "/api", params);
  generateUser();
}

function changeUser(){
  $("#nusers").text(`N Users: ${users.value}`);

  tot = users.value;
  i = 0;

  params = {
    results: tot,
    gender: genere,
    nat: nazione
  }
  promise = ajax.sendRequest("GET", "/api", params);
  generateUser();
}

function changeNat(){
  if(this.checked){
    nazione = this.value;
  }
  else{
    nazione = "";
  }

  i = 0;
  params = {
    results: tot,
    gender: genere,
    nat: nazione
  }
  promise = ajax.sendRequest("GET", "/api", params);
  generateUser();
}

function changeDim(){
  dimensione = dim.value;
  generateUser();
}

function next(){
  i++;
  generateUser();
}

function previous(){
  i--;
  generateUser();
}

function first(){
  i = 0;
  generateUser();
}

function last(){
  i = tot -1;
  generateUser();
}