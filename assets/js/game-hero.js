"use strict";

//HERO OBJECTS

//Declare hero data objects that is accessed when generating
// the data for the selected hero.
const heroesData = [
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
    image: "assets/images/heroes/grogu.png",
    description:
      "A male force-sensitive to Mandalorian belonging to the same mysterious species as legendary Grand Master yoda",
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
    image: "assets/images/heroes/mandalorian.png",
    description:
      "A bounty hunter originally hired to capture Grogu, Mandalorian instead protects him from the fallen Galactic Empire and becomes a father figure for him.",
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
    image: "assets/images/heroes/r2-d2.png",
    description:
      "He is an astromech droid who served Jedi Knight Skywalker during the clone wars. He always knew that he needed to keep his friends safe and he stopped at nothing to achieve that goal which made him a true hero.",
  },
  {
    name: "Rey",
    diceAmount: {
      red: 3,
      blue: 1,
      green: 2,
      yellow: 5,
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
    image: "assets/images/heroes/rey.png",
    description:
      "Adopts the name Rey Skywalker to honor her mentors, an amazing force-sensitive bloodline of the Sheev Palpatine. As the last remaining Jedi, she makes it her mission to rebuild the Jedi order.",
  },
];

//Declare the current hero object
let currentGameHeroData;
let rewardOfChoice;

//Retrieve the HTML from the DOM
const rewardWrapper = document.getElementById("reward-wrapper");
const extraLifeHtml = document.getElementById("extra-life");
const blackDiceHtml = document.getElementById("black-dice");
const extraDiceHtml = document.getElementById("extra-dice");
const extraColorOneHtml = document.getElementById("extra-dice-color-one");
const extraColorTwoHtml = document.getElementById("extra-dice-color-two");
const extraSpaceHtml = document.getElementById("extra-space");
const spaceColorHtml = document.getElementById("extra-space-color");

//SELECT HERO FUNCTIONALITIES

//When html is dowloaded the modal HTML is dowloaded using the heroesData object

function renderModalHeroes() {
  const modalContent = document.getElementById("modal-heroes");
  let modalInner = "";
  for (let i in heroesData) {
    modalInner += `
        <div class="carousel-item ${i == 0 ? "active" : ""} selectHero" id="${heroesData[i].name}">
            <img src="${heroesData[i].image}" class="d-block hero-img m-auto text-center" alt="Image of ${
      heroesData[i].name
    }">
            <h5 class="w-100 d-block m-auto text-center">${heroesData[i].name}</h5>
            <p class="w-100 d-block m-auto text-center">${heroesData[i].description}</p>
        </div>`;
  }
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
function renderHeroGameProfile(index) {
  if (index) {
    renderHeroPowers();
    renderHeroLife();
    renderHeroImg();
  } else {
    currentGameHeroData = heroesData[index];
    renderHeroPowers();
    renderHeroLife();
    renderHeroImg();
  }
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


//Clears the hero data
function clearHeroProfile() {
  currentGameHeroData = {};
}

//--------GENERATE REWARD MODAL--------//
function generateRewardObjects() {
//Generates 3 rewards and adds them to reward modal
  let wrapperRewardHtml = document.getElementById("reward-wrapper");
  wrapperRewardHtml.innerHTML = ""
  let innerRewardHtml = ""

  for (let i = 0; i < 3; i++) {
    let rewardType = getRewardType();
    let colorArray = getDiceColor(rewardType);
    innerRewardHtml += generateRewardHtml(colorArray, rewardType);

  }

  wrapperRewardHtml.innerHTML= innerRewardHtml;
}

function getRewardType() {
  //Generates 1 of 4 reward types:
  //black dice, 2 colored dices,
  //1 extra dice space/storage or 10 more health points
  //villain's reward percentages determine likelyhood for reward type
  //Reward is savedn to rewardType variable and retunred
  const colorPrc = currentVillainData.rewardProcentage.color;
  const blackPrc = currentVillainData.rewardProcentage.black;
  const healthPrc = currentVillainData.rewardProcentage.health;
  let randomNo = randomInt(0, 100);
  let rewardType;

  if (randomNo < colorPrc) {
    rewardType = "color";
  } else if (randomNo < colorPrc + blackPrc) {
    rewardType = "black";
  } else if (randomNo < colorPrc + blackPrc + healthPrc) {
    rewardType = "health";
  } else{
    rewardType = "extraStorage";
  } 
  return rewardType;
}

function getDiceColor(rewardType) {
  //Generates 1 of 4 colors:
  //red, blue, green or yellow
  //If rewardType is "color" two colors are generated
  //Depending on villain, the likelihood of dropping colors varies
  //If rewardType is "extraStorage" one color is generated
  //Colors are stored in diceColors-array and returned
  const redRew = currentVillainData.colorReward.red;
  const blueRew = currentVillainData.colorReward.blue;
  const greenRew = currentVillainData.colorReward.green;
  let diceColors = [];
  let cycles = 0;

  rewardType == "color" ? (cycles = 2) : "";
  rewardType == "extraStorage" ? (cycles = 1) : "";

  for (let i = 0; i < cycles; i++) {
    let randomNo2 = randomInt(0, 100);
    if (randomNo2 < redRew) {
      diceColors.push("red");
    } else if (randomNo2 < redRew + blueRew) {
      diceColors.push("blue");
    } else if (randomNo2 < redRew + blueRew + greenRew) {
      diceColors.push("blue");
    } else {
      diceColors.push("yellow");
    }
  }
  return diceColors;
}

function generateRewardHtml(colorArray, rewardType) {
  // Generate the html
  // Save it as a it as a string into a variable and return it 
  let rewardHtml = ""
  switch (rewardType){
    case "health":
      rewardHtml = `
        <button type="button" class= "btn reward-option col-3 btn-secondary" onclick="saveRewardChoices('currentLife', null)">
          <i class="fa-solid fa-heart"> +10 
            </i>
          <br>Life
        </button>`
        break
    case "black":
      rewardHtml = `
      <button type="button" class= "btn reward-option col-3 btn-secondary" onclick="saveRewardChoices('black', null)">
        <div class= "dice-black dice">
          </div>
        <p>Black dice</p>
      </button>`
      break
    case "color":
      rewardHtml = `
        <button type="button" class= "btn reward-option col-3 btn-secondary" onclick="saveRewardChoices('${colorArray[0]}', '${colorArray[1]}')">
          <div class= "dice-${colorArray[0]} dice">
            </div>
          <div class= "dice-${colorArray[1]} dice stack-top">
            </div>
          <p>2 extra dices</p>
        </button>`
      break
    case "extraStorage":
      rewardHtml =`
        <button type="button" class= "btn reward-option col-3 btn-secondary" onclick="saveRewardChoices('${colorArray[0]}', 'diceLimit')">
          <div class= "dice-b-${colorArray[0]} dice">
            </div>
          <br> Dice storage
        </button>`
      break
  }

  return rewardHtml;
}

function saveRewardChoices(main, secondary) {
// Temporarily stores rewards in global variable rewardOfChoice
// Once user has selected reward they like, they must press confirm
// Confirm will Activate updateHeroData
  rewardOfChoice = [main, secondary];
}

//UPDATE HERO PROFILE WITH REWARD

function updateHeroData() {
  // Updates the currentGameHerodata with the rewardOfChoice.
  // Reward of Choice has two values [main, secondary] see generateRewardHtml for options.
  // Switch system is used to check the reward type.
  // Reward type determines how the currentGameHeroData is updated.

  const lifeLimit = currentGameHeroData.maxLife;

  switch (true){
    case rewardOfChoice[0] == "black":
      currentGameHeroData.diceAmount["black"] += 1;
      break
    case rewardOfChoice[0] == "currentLife":
      currentGameHeroData["currentLife"] += 10;
      if (currentGameHeroData.currentLife > lifeLimit){
        currentGameHeroData.currentLife = lifeLimit};
      break
    case rewardOfChoice[1] == "diceLimit":
      currentGameHeroData.diceLimit[rewardOfChoice[0]] += 1;
      break
    default:
      incrementDice();
    }
  
    renderHeroPowers();
    renderHeroLife();
}

function incrementDice(){
    for (let i of rewardOfChoice){
    currentGameHeroData.diceAmount[i] += 1;
    if (currentGameHeroData.diceAmount[i] > currentGameHeroData.diceLimit[i]){
      currentGameHeroData.diceAmount[i] = currentGameHeroData.diceLimit[i]
    }
  }
}

