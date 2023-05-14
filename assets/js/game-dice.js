"use strict";

// this is a a file that deals with dice roll and control

const diceArea = document.querySelector("#dice-area");
const blenderArea = document.querySelector("#blender-area");

// -------------------------------------------------
let currentDiceBoard = [];

let currentBlender = [3, 4];

// takes hero avialable dices, rolls them and pushes to dice array
function rollDices() {
  const data = currentGameHeroData.diceAmount;

  const colors = ["red", "blue", "green", "yellow", "black"];

  for (let color of colors) {
    for (let i = 0; i < data[color]; i++) {
      const diceRoll = randomInt(1, 6);

      const diceWord = setDicePhrase(diceRoll);

      const object = { roll: diceRoll, color: color, id: currentGameSettings.diceId++, dicePhrase: diceWord };
      currentDiceBoard.push(object);
    }
  }
  console.log(currentDiceBoard);
  renderDiceBoard();
  callAllDragables();
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
function blendDice() {
  const blackDice = { color: "black", id: currentGameSettings.diceId };
  const sum = currentBlender.reduce((a, cV) => a + cV, 0);
  blackDice.roll = Math.floor(sum / currentBlender.length);
  const diceWord = setDicePhrase(blackDice.roll);
  blackDice.dicePhrase = diceWord;
  currentDiceBoard.push(blackDice);
  clearBlender();
  currentGameSettings.diceId++;
  renderDiceBoard();
}

function renderDiceBoard() {
  diceArea.innerHTML = "";
  for (let i = 0; i < currentDiceBoard.length; i++) {
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("dice");
    mainDiv.classList.add(`dice-${currentDiceBoard[i].color}`);
    mainDiv.setAttribute("draggable", "true");
    mainDiv.setAttribute("data-dice-ammount", currentDiceBoard[i].roll);
    mainDiv.setAttribute("data-dice-id", currentDiceBoard[i].id);
    const diceSVG = dicePath(currentDiceBoard[i].roll);
    mainDiv.innerHTML = diceSVG;
    diceArea.appendChild(mainDiv);
  }
}

function setDicePhrase(diceRoll) {
  let diceWord;
  switch (diceRoll) {
    case 1:
      diceWord = "one";
      break;
    case 2:
      diceWord = "two";
      break;
    case 3:
      diceWord = "three";
      break;
    case 4:
      diceWord = "four";
      break;
    case 5:
      diceWord = "five";
      break;
    case 6:
      diceWord = "six";
      break;
    default:
      "";
  }
  return diceWord;
}

function dicePath(diceRoll) {
  let diceSVG;
  switch (diceRoll) {
    case 1:
      diceSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-dice-1" viewBox="0 0 16 16"> <circle cx="8" cy="8" r="1.5"/> <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/> </svg>`;
      break;
    case 2:
      diceSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-dice-2" viewBox="0 0 16 16"> <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/> <path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/> </svg>`;
      break;
    case 3:
      diceSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-dice-3" viewBox="0 0 16 16"> <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/> <path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-4-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/> </svg>`;
      break;
    case 4:
      diceSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-dice-4" viewBox="0 0 16 16"> <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/> <path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/> </svg>`;
      break;
    case 5:
      diceSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-dice-5" viewBox="0 0 16 16"> <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/> <path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm4-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/> </svg>`;
      break;
    case 6:
      diceSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-dice-6" viewBox="0 0 16 16"> <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/> <path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-8 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/> </svg>`;
      break;
    default:
      "";
  }
  return diceSVG;
}
