"use strict";

// Main and staring file seting global variables

// Starting game settings
const gameSettings = {
  score: 0,
  level: 5,
  diceId: 1,
  volume: 0,
  diceArrangment: "size",
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
});

function endRound() {
  generateRewardObjects();
  // calculateHealth(); // Not done yet
  // calculateScoreGained(); // Not done yet
  // renderGameScore(); // Not done yet
  // addGameLevel();
  // clearVillainProfile();
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
