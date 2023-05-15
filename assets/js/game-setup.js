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
  rollAvialable: true,
};
//-------------------------------------Fix later----------------------
// Loaded game settings
const currentGameSettings = gameSettings;

// Is used to find out random number
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

window.addEventListener("load", () => {
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
    if (heroesData[i].name == activeHero) renderHeroGameProfile(i);
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
      renderVillian(activeVillain);
    }
  }
}
