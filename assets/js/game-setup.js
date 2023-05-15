"use strict";

// Main and staring file seting global variables

// Starting game settings
const gameSettings = {
  score: 0,
  highestScore: 0,
  lastScore: 0,
  level: 1,
  diceId: 1,
  LastHealthLoss: 0,
  currentHealth: 30,
  volume: 0,
  diceArrangment: "size",
  rollAvialable: false,
};
//-------------------------------------Fix later----------------------
// Loaded game settings
let currentGameSettings;

// Is used to find out random number
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

window.addEventListener("load", () => {
  if (!getLocalStorage()) {
    currentGameSettings = gameSettings;
  } else {
    currentGameSettings = getLocalStorage()[0];
    currentGameHeroData = getLocalStorage()[1];
    currentVillainData = getLocalStorage()[2];
    currentDiceBoard = getLocalStorage()[3];
    renderDiceBoard();
    renderHeroGameProfile(true);
    renderVillian();
  }

  addNewEventListeners("add");
  callAllDropables();
  renderModalHeroes();
  renderVillainModal();
});

function endRound() {
  generateRewardObjects();
  calculateScoreAndHealth();
  // renderGameScore(); // Not done yet
  addGameLevel();
  clearVillainProfile();
  // updateHeroGameProfile(); // Not done yet
  // renderHeroStats(); // Not done yet
}

function addGameLevel() {
  currentGameSettings.level++;
}

function clearVillainProfile() {
  const villianImage = document.getElementById("villian-image");
  const villianDescription = document.getElementById("villian-description");
  villianImage.innerHTML = "";
  villianDescription.innerHTML = "";
}

function openHeroModal() {
  const heroModal = new bootstrap.Modal(document.getElementById("selectHeroModal"), {
    keyboard: false,
  });

  const menuModal = new bootstrap.Modal(document.getElementById("modalMenu"), {
    keyboard: false,
  });

  heroModal.show();
  menuModal.hide();
}

function selectHeroButton() {
  const herroHTMLArray = document.getElementsByClassName("selectHero");
  let activeHero;
  for (let i = 0; i < herroHTMLArray.length; i++) {
    if (herroHTMLArray[i].classList.length == 3) {
      activeHero = herroHTMLArray[i].id;
    }
  }
  for (let i = 0; i < heroesData.length; i++) {
    if (heroesData[i].name == activeHero) {
      renderHeroGameProfile(i);
      setLocalStorage();
    }
  }
}

function calculateScoreAndHealth() {
  let score = 0;
  let healthLoss = 0;

  for (let i = 0; i < dropBoxesCenters; i++) {
    score += dropBoxesCenters.diceScore;
    const total = parseInt(dropBoxesCenters.requiredScore) - dropBoxesCenters.diceScore;
    // either get exta points or lose  health
    total > 0 ? (score += total * 2) : (healthLoss += total);
  }
  currentGameSettings.LastHealthLoss = healthLoss;
  currentGameSettings.currentHealth += healthLoss;

  lastScore += score;
}

function selectVillain() {
  const villainHTMLArray = document.getElementsByClassName("villain-modal-description");

  let activeVillain;
  for (let i = 0; i < villainHTMLArray.length; i++) {
    const contains = villainHTMLArray[i].classList.contains("active");
    if (contains) {
      activeVillain = villainHTMLArray[i].getAttribute("data-villain-id");
      saveVillainData(activeVillain);
      setLocalStorage();
      renderVillian();
    }
  }

  currentGameSettings.rollAvialable = true;
}

// ===========================================  LOCAL STORAGE =============================================================================

// used during the game to update and store game data to upload later
function setLocalStorage() {
  // Game settings
  localStorage.setItem(`currentGameSettings`, JSON.stringify(currentGameSettings));

  // Hero Data
  localStorage.setItem(`currentGameHeroData`, JSON.stringify(currentGameHeroData));

  // Villain Data
  localStorage.setItem(`currentVillainData`, JSON.stringify(currentVillainData));

  // Dice data
  localStorage.setItem(`currentDiceBoard`, JSON.stringify(currentDiceBoard));
}

// used when game is loaded
function getLocalStorage() {
  const currentGameSettings = JSON.parse(localStorage.getItem(`currentGameSettings`));

  const currentGameHeroData = JSON.parse(localStorage.getItem(`currentGameHeroData`));

  const currentVillainData = JSON.parse(localStorage.getItem(`currentVillainData`));

  const currentDiceBoard = JSON.parse(localStorage.getItem(`currentDiceBoard`));

  if (!currentGameSettings || !currentGameHeroData || !currentVillainData || !currentDiceBoard) return;

  return [currentGameSettings, currentGameHeroData, currentVillainData, currentDiceBoard];
}

function modalControl(status) {
  const hero = document.getElementById("select-hero-modal");
  const villain = document.getElementById("villain-Modal");
  const meniu = document.getElementById("Menu-modal-body");
  const rewards = document.getElementById("gameOverModalLabel");
  if (status == "hero") {
    hero.classList.add("hiden");
    villain.classList.remove("hiden");
    meniu.classList.remove("hiden");
    rewards.classList.remove("hiden");
  } else if (status == "villain") {
    hero.classList.remove("hiden");
    villain.classList.add("hiden");
    meniu.classList.remove("hiden");
    rewards.classList.remove("hiden");
  } else if (status == "meniu") {
    hero.classList.remove("hiden");
    villain.classList.remove("hiden");
    meniu.classList.add("hiden");
    rewards.classList.remove("hiden");
  } else if (status == "rewards") {
    hero.classList.remove("hiden");
    villain.classList.remove("hiden");
    meniu.classList.remove("hiden");
    rewards.classList.add("hiden");
  }
}
