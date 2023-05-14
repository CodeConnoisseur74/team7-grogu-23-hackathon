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
    image: "assets/images/heroes/grogu.png",
    description: "A male force-sensitive to Mandalorian belonging to the same mysterious species as legendary Grand Master Yoda",
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
    description: "A bounty hunter originally hired to capture Grogu, Mandalorian instead protects him from the fallen Galactic Empire and becomes a father figure for him.",
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
    description: "He is an astromech droid who served Jedi Knight Skywalker during the clone wars. He always knew that he needed to keep his friends safe and he stopped at nothing to achieve that goal which made him a true hero.",
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
    image: "assets/images/heroes/rey.png",
    description: "Adopts the name Rey Skywalker to honor her mentors, an amazing force-sensitive bloodline of the Sheev Palpatine. As the last remaining Jedi, she makes it her mission to rebuild the Jedi order.",
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
        <div class="carousel-item ${i == 0 ? "active" : ""} selectHero" onclick= renderHeroGameProfile(${i}) id="${heroesData[i].name}">
            <img src="${heroesData[i].image}" class="d-block hero-img m-auto text-center" alt="Image of ${heroesData[i].name}">
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

// GENERATE REWARDS
let currentVillainData = {
    name: "Darth Veder",
    picture: "assets/images/villians/darth-vader.png",
    description: "A high ranking Jedi Knight who fought for Galactic Republic.",
    strongAgainst: "Prefers Blue and Red",
    colorProcentages: {
      red: 30,
      blue: 30,
      green: 20,
      yellow: 20,
      black: 0,
    }, rewardProcentage: { color: 35, black: 10, health: 20, extraStorage: 20, extraBlackStorage: 15 },
    colorReward: { red: 25, blue: 30, green: 10, yellow: 35 },
    minimum: 5,
    maximum: 7,
}


function generateRewardObjects() {
  let rewardsArray = [];
  const colorPrc = currentVillainData.rewardProcentage.color;
  const blackPrc = currentVillainData.rewardProcentage.black;
  const healthPrc = currentVillainData.rewardProcentage.health;
  const extraStoragPrc = currentVillainData.rewardProcentage.extraStorage;
  const extraBlackStoragePrc = currentVillainData.rewardProcentage.extraBlackStorage;

  const redRew = currentVillainData.colorReward.red;
  const blueRew = currentVillainData.colorReward.blue;
  const greenRew = currentVillainData.colorReward.green;
  const yellowRew = currentVillainData.colorReward.yellow;

  for (let i = 0; i < 3; i++) {
    const randomNo = randomInt(0, 100);

    let rewardType;
    if (randomNo < colorPrc) {
      rewardType = "color";
    } else if (randomNo < colorPrc + blackPrc) {
      rewardType = "black";
    } else if (randomNo < colorPrc + blackPrc + healthPrc) {
      rewardType = "health";
    } else if (randomNo < colorPrc + blackPrc + healthPrc + extraStoragPrc) {
      rewardType = "extraStorage";
    } else {
        rewardType = "extraBlackStoragePrc";
      }

    const randomNo2 = randomInt(0, 100);
    let diceColors = [];
    let cycles = 0;
    rewardType == "color" ? (cycles = 2) : "";
    rewardType == "extraStorage" ? (cycles = 1) : "";

    for (let i = 0; i<cycles; i++) {
        if(randomNo2 < redRew) {
            diceColors.push("redRew");
        } else if (randomNo2 < redRew + blueRew) {
            diceColors.push("blueRew");
        } else if (randomNo2 < redRew + blueRew + greenRew) {
            diceColors.push("blueRew");
        } else if (randomNo2 < redRew + blueRew + greenRew + yellowRew) {
            diceColors.push("yellowRew");
        } else {
            diceColors.push("blackRew");
        }
    }
    let reward;
    if(rewardType == "black") {
        reward = `
        <div class= "reward- black" id="black-reward-dice"></div>`;
    } else if(rewardType ==`health`) {
        reward = `
        <div class= "reward-life" id="currentLife">
            <i class="fa-solid fa-heart"> +10 </i>
        </div>`;
    } else if(rewardType =="color"){
        reward = `
        <div class= "reward-dice ${color[0]}" id="${color[0]}-reward-dice"></div>
        <div class= "reward-dice ${color[0]}" id="${color[0]}></div>`;
    } else if(rewardType =="extraStorage"){
        reward = `
        <div class= "reward-space ${color[0]}" id="${color[0]}-reward-slot"></div>
        <div class= "reward-space ${color[0]}" id="${color[0]}-reward-slot"></div>`;
    };
    rewardsArray.push(reward);

    }

    console.log(rewarsdArray)
  }

//----------------------------------------------------------------

function generateRewards() {
  let rewardWrapper = document.getElementById("reward-wrapper");
  for (let i = 0; i < 3; i++) {
    rewardWrapper.innerHTML += `<div class="reward-box"></div>`;
  }
}

// //REWARD MODAL AND GENERATION
generateRewardObjects();

// ----------------------------------------------------------------

//Used when the current game reloaded or when round is over, and hero loses helth
//Updates current game hero profile stats
// function updateHeroGameProfile(currentGameHeroData)

// const rewards = {
//     lifePoints: {
//         amount: "+10",
//         id:"life-points",
//         htmlElementtype: "i",
//         classContent:"fa-solid fa-heart health-heart"},
//     blackDice: {
//         amount: 1,
//         id:"black-power",
//         htmlElementtype: "span",
//         badgeType:"badge bg-dark power-badges"},
//     otherDice: {
//         amount: 2,
//         id: {
//             red:"reward-red-power",
//             blue: "reward-blue-power",
//             green:"reward-green-power",
//             yellow:"reward-yellow-power",
//             },
//         htmlElementtype: "span",
//         classContent:{
//             red:"badge bg-danger power-badge",
//             blue: "badge bg-primary power-badges",
//             green:"badge bg-success power-badges",
//             yellow:"badge bg-warnin power-badges",
//         }
//     },
//     diceSlots: {
//         amount: 2,
//         id:{
//             red: "reward-red-slot",
//             blue:"reward-blue-slot",
//             green:"reward-yellow-slot",
//             yellow: "reward-green-slot"},
//         htmlElementType: "span",
//         classContent:{
//             red:"badge bg-danger power-badge",
//             blue: "badge bg-primary power-badges",
//             green:"badge bg-success power-badges",
//             yellow:"badge bg-warnin power-badges",
//         }
//     },
// }

// function generateRewards(){

//     const rewardContainer = document.getElementById("reward-container")
//     let rewardHtml = ""
//     let randomDiceColor = getRandomDiceColor()
//     let randomSlotColor = getRandomDiceColor()
//     let rewardsObj = {}

//     for(let i of rewards){
//         if (i == diceSlots){
//             rewardHtml += `
//             <${i.htmlElementType}> class="${i.classContent[4]}" id="${i.id[4]}">${}</${i.htmlElementType}>`
//         }
//         rewardHtml += `
//         <${i.htmlElementType}> class="${}" id="${}">${}</${i.htmlElementType}>`
//     }
// }

// function getRandomDiceColor(){
//     const otherDiceColors =[red, blue, green, yellow]
//     let number = Math.floor(Math.random() * length[otherDiceColors]);
//     return otherDiceColor[number];
// }
