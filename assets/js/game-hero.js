"use strict";

//HERO OBJECTS
//Declare the current hero object
let currentGameHeroData = {};

//Declare hero data objects that is accessed when generating
// the data for the selected hero.
let heroesData = [
  {
    name: "Grogu",
    diceAmount: {
      red: 3,
      blue: 3,
      green: 3,
      yellow: 3,
      black: 0,
    },
    diceLimit: {
      red: 6,
      blue: 6,
      green: 6,
      yellow: 6,
      black: 6,
    },
    maxLife: 30,
    currentLife: 20,
    image: "assets/images/grogu.png",
    description: "",
  },
  {
    name: "Mandalorian",
    diceAmount: {
      red: 5,
      blue: 3,
      green: 2,
      yellow: 2,
      black: 0,
    },
    diceLimit: {
      red: 6,
      blue: 6,
      green: 6,
      yellow: 6,
      black: 6,
    },
    maxLife: 30,
    currentLife: 30,
    image: "assets/images/mandalorian.png",
    description: "",
  },
  {
    name: "R2-D2",
    diceAmount: {
      red: 1,
      blue: 3,
      green: 5,
      yellow: 2,
      black: 1,
    },
    diceLimit: {
      red: 6,
      blue: 6,
      green: 6,
      yellow: 6,
      black: 6,
    },
    maxLife: 30,
    currentLife: 30,
    image: "assets/images/r2-d2.png",
    description: "",
  },
  {
    name: "Rey",
    diceAmount: {
      red: "3",
      blue: "1",
      green: "2",
      yellow: "5",
      black: "1",
    },
    diceLimit: {
      red: 6,
      blue: 6,
      green: 6,
      yellow: 6,
      black: 6,
    },
    maxLife: 30,
    currentLife: 30,
    image: "assets/images/rey.png",
    description: "",
  },
];

//SELECT HERO FUNCTIONALITIES

//When html is dowloaded the modal HTML is dowloaded using the heroesData object
renderModalHeroes();

function renderModalHeroes() {
  const modalContent = document.getElementById("modal-heroes");
  let modalInner = "";
  for (let i in heroesData) {
    modalInner += `
        <div class="carousel-item ${i == 0 ? "active" : "not-active"} selectHero" id="${heroesData[i].name}">
            <img src="${heroesData[i].image}" class="d-block mx-auto" alt="Image of ${heroesData[i].name}">
            <p class="mx-auto d-block">${heroesData[i].name}<br>${heroesData[i].description}</p>
        </div>`;
  }
  console.log(modalInner);
  modalContent.innerHTML = modalInner;
}

//The eventlistener for the modals carousle-items belonign to selectHero class
//Calls renderHeroGameProfile
document.querySelectorAll(".selectHero").forEach((occurence) => {
  let id = occurence.getAttribute("id");
  occurence.addEventListener("click", function () {
    renderHeroGameProfile(id);
  });
});

//UPDATE HERO DATA
//This function initiates the hero profile update
function renderHeroGameProfile(hero) {
  let heroObject = {};
  for (let i of heroesData) {
    if (i.name == hero) {
      heroObject = i;
    }
  }
  currentGameHeroData = heroObject;
  renderHeroPowers();
  renderHeroLife();
  renderHeroImg();
}

//Function that renders power stats
function renderHeroPowers() {
  const redPower = currentGameHeroData.diceAmount.red;
  const bluePower = currentGameHeroData.diceAmount.blue;
  const greenPower = currentGameHeroData.diceAmount.green;
  const yellowPower = currentGameHeroData.diceAmount.yellow;
  const blackPower = currentGameHeroData.diceAmount.black;

  const redLimit = currentGameHeroData.diceLimit.red;
  const blueLimit = currentGameHeroData.diceLimit.blue;
  const greenLimit = currentGameHeroData.diceLimit.green;
  const yellowLimit = currentGameHeroData.diceLimit.yellow;
  const blackLimit = currentGameHeroData.diceLimit.black;

  const diceSlots = document.getElementsByClassName("power-badges");
  diceSlots[0].innerHTML = `${redPower}/${redLimit}`;
  diceSlots[1].innerHTML = `${bluePower}/${blueLimit}`;
  diceSlots[2].innerHTML = `${greenPower}/${greenLimit}`;
  diceSlots[3].innerHTML = `${yellowPower}/${yellowLimit}`;
  diceSlots[4].innerHTML = `${blackPower}/${blackLimit}`;
}

//Function that renders hero life
function renderHeroLife() {
  const maxLife = currentGameHeroData.maxLife;
  const currentLife = currentGameHeroData.currentLife;
  const healthRemaining = document.getElementById("healthRemaining");
  const healthPoints = document.getElementById("health-points");

  healthRemaining.style.width = `${(100 * currentLife) / maxLife}%`;
  healthPoints.innerHTML = `${currentLife}/${maxLife}`;
}

//Function that renders the hero photo
function renderHeroImg() {
  const gameHeroImg = document.getElementById("game-hero-img");
  gameHeroImg.setAttribute("src", currentGameHeroData.image);
}

//Function updates the player stats according to the selected rewards
function addRewardsToHero(selectedReward) {}

//Clears the hero data
function clearHeroProfile() {
  currentGameHeroData = {};
}

//Used when the current game reloaded or when round is over, and hero loses helth
//Updates current game hero profile stats
//function updateHeroGameProfile(currentGameHeroData)

//take currentGameHeroData{} And render new hero stats in html
//function renderHeroStats()
