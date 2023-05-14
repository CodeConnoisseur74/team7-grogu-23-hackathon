"use strict";

// this is a a file that deals with dice roll and control

const diceArea = document.querySelector("#dice-area");
const blenderArea = document.querySelector("#blender-area");

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

      const object = { roll: diceRoll, color: color, id: currentGameSettings.diceId++, dicePhrase: diceWord };
      currentDiceBoard.push(object);
    }
  }
  console.log(currentDiceBoard);
  renderDiceBoard();
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
  const blackDice = { color: "black", id: currentGameSettings.diceId };

  const sum = currentBlender.reduce((a, cV) => a + cV.roll, 0);
  blackDice.roll = Math.floor(sum / currentBlender.length);

  currentDiceBoard.push(blackDice);
  clearBlender();
  currentGameSettings.diceId++;
}

function renderDiceBoard() {
  for (let i = 0; i < currentDiceBoard.length; i++) {
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("dice");
    mainDiv.classList.add(`dice-${currentDiceBoard[i].color}`);
    mainDiv.setAttribute("draggable", "true");
    mainDiv.setAttribute("data-dice-ammount", currentDiceBoard[i].roll);
    mainDiv.setAttribute("data-dice-id", currentDiceBoard[i].id);
    mainDiv.innerHTML = `<i class="fa-solid fa-dice-${currentDiceBoard[i].dicePhrase}"></i>`;
    diceArea.appendChild(mainDiv);
  }
}

// for (let i = 0; i < villianChoice.length; i++) {
//   const mainDiv = document.createElement("a");
//   const pictureDiv = document.createElement("div");
//   const descriptionDiv = document.createElement("div");
//   mainDiv.setAttribute("onclick", `renderVillian(${i})`);
//   mainDiv.classList.add("villain-modal-description");

//   descriptionDiv.innerHTML = villianChoice[i].description;

//   mainDiv.appendChild(pictureDiv);
//   mainDiv.appendChild(descriptionDiv);
//   villainModalBoddy.appendChild(mainDiv);
// }
