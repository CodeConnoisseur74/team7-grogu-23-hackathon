"use strict";

// this is a a file that deals with dice roll and control

const diceArea = document.querySelector("dice-area");
const blenderArea = document.querySelector("blender-area");

// Delete later ----------------------------------
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Starting game settings
const gameSettings = {
  score: 0,
  level: 0,
  diceId: 1,
  diceArrangment: "size",
};

// -------------------------------------------------
let currentDiceBoard = [];

let currentBlender = [];

// takes hero avialable dices, rolls them and pushes to dice array
function rollDices() {
  const data = currentGameHeroData.diceAmount;

  const colors = ["red", "blue", "green", "yellow", "black"];

  for (let color of colors) {
    for (let i = 0; i < data[color]; i++) {
      const diceRoll = randomInt(1, 6);
      const object = { roll: diceRoll, color: color, id: gameSettings.diceId++ };
      currentDiceBoard.push(object);
    }
  }
}

// clears up dice array and html
function clearDiceBoard() {
  currentDiceBoard = [];
  diceArea.innerHTML = "";
}

// moves items from blender array to dice area and cleans it up same for html
function clearBlender(moveDice) {
  // used when the end turn is called and there are dices in the blender
  if (moveDice) currentBlender.forEach((e) => currentDiceBoard.push(e));

  currentBlender = [];
  blenderArea.innerHTML = "";
}

// sorts out currentDiceBoard array acording to dice number
function sortArrayByRoll() {
  let rearangedArray = [...currentDiceBoard];
  rearangedArray.sort((a, b) => a.roll - b.roll);
  currentDiceBoard = rearangedArray;
}

// sorts out currentDiceBoard array acording to colour name
function sortArrayByColor() {
  let rearangedArray = [...currentDiceBoard];
  rearangedArray.sort((a, b) => {
    if (a.color < b.color) {
      return -1;
    }
    if (a.color > b.color) {
      return 1;
    }
    return 0;
  });
  currentDiceBoard = rearangedArray;
}

// turns dice in the blender to average of 2 dice in to 1 black
function conventDice() {
  const blackDice = { color: "black", id: gameSettings.diceId };

  const sum = currentBlender.reduce((a, cV) => a + cV.roll, 0);
  blackDice.roll = Math.floor(sum / currentBlender.length);

  currentDiceBoard.push(blackDice);
  clearBlender();
  gameSettings.diceId++;
}
