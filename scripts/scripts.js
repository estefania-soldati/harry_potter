const houses = [
  {
    name: 'Gryffindor',
    img: './assets/images/gryffindor.jfif'
  },
  {
    name: 'Ravenclaw',
    img: './assets/images/Ravenclaw.png'
  },
  {
    name: 'Hufflepuff',
    img: './assets/images/hufflepuff.png'
  },
  {
    name: 'Slytherin',
    img: './assets/images/Slytherin.jfif'
  }
]


let assignedHouse = "";
let assignedHouseImg = "";

function hideWelcome(){
  const welcome = $(".welcomeH2");
  const heroInformation = $(".hero-information");
  welcome.fadeIn(500, function(){});
  heroInformation.fadeIn(500, function(){});
}

function showHat(){
  const name = document.querySelector(".hero-name").value
    if (name == "") {
      alert("Hey witzard fill your name before continuing");
    }
    else{
      document.querySelector(".welcome").style.display = "none";
      document.querySelector(".sorting-hat").style.display = "block";
    }
}

function showHouse(){
  const hat = document.querySelector(".hat");
  this.classList.add("disabled");
  $.ajax({
    type: 'GET',
    url: 'https://www.potterapi.com/v1/sortingHat',
    data:{
        key: "$2a$10$Oukoqh9UVruaCXKEuk6vc.pLrKTI6kcj8I5fn9crzUI1KMW2CwIYy"
    },
    success: function(response) {
      console.log(response);
      assignedHouse = response;
      var house = document.querySelector(".house");
      document.querySelector(".sorting-hat").style.display = "none";
      document.querySelector(".houses").style.display = "block";
      house.innerText = response;
      switch (response){
        case "Slytherin":
          house.style.color = "green"
          break;
        case "Gryffindor":
          house.style.color = "red"
          break;
        case "Hufflepuff":
          house.style.color = "yellow"
          break;
        default:
         house.style.color = "blue"
      }
      showHouseLogo()
    },
    error: function(status) {
      console.warn( 'ERROR', status );
    }
  });
}

function showHouseLogo(){
  const logo = document.querySelector(".logo");

  houses.forEach(function(house){
    if (assignedHouse === house.name) {
      assignedHouseImg = house.img;
    }
  })

  let img = document.createElement("IMG");
  img.setAttribute('src', assignedHouseImg);
  logo.append(img);  
}

const wands = {
  wood:['Holly', 'Elderberry', 'Cherry', 'Elm', 'Walnut'],
  core:['Phoenix Tail Feather','Thestral Hair','Unicorn Hair','Veela Hair','Dragon Heart Fiber']
}

function findWand (){
  document.querySelector(".houses").style.display = "none";
  document.querySelector(".wand").style.display = "block";
  let randomNumberWood = Math.floor(Math.random()*(wands.wood["length"]));
  document.querySelector(".wood").textContent = wands.wood[randomNumberWood].toLowerCase();
  let randomNumberCore = Math.floor(Math.random()*(wands.core["length"]));
  document.querySelector(".core").textContent = wands.core[randomNumberCore].toLowerCase();

}

function showSpells(){
  $.ajax({
    type: 'GET',
    url: 'https://www.potterapi.com/v1/spell',
    data:{
        key: "$2a$10$Oukoqh9UVruaCXKEuk6vc.pLrKTI6kcj8I5fn9crzUI1KMW2CwIYy"
    },
    success: function(spell) {
      console.log(spell)
      document.querySelector(".wand").style.display = "none";
      document.querySelector(".spells").style.display = "block";
    },
    error: function(status) {
      console.warn( 'ERROR', status );
    }
  });
}

function completeData (){
  const name = document.querySelector(".hero-name").value
    document.querySelector(".name").textContent = name;
    document.querySelector(".name").value = name;
    
    document.querySelector(".go-house").textContent = assignedHouse;
    document.querySelector(".go-house").value = assignedHouse;

  const wood = document.querySelector(".wood").value
    document.querySelector(".go-wood").textContent = wood;
    document.querySelector(".go-wood").value = wood;
}

window.onload = function(){
  document.querySelector(".welcome").addEventListener("mousemove", hideWelcome);
  document.querySelector(".button-hero").addEventListener("click", showHat);
  document.querySelector(".hat").addEventListener("click", showHouse); 
  document.querySelector(".house-button").addEventListener("click",findWand);
  document.querySelector(".wand-button").addEventListener("click",showSpells);
  document.querySelector(".wand-button").addEventListener("click", completeData);
}