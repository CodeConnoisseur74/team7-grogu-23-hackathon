"use strict";

// this is a a file that deals with dice roll and control

const diceArea = document.querySelector("#dice-area");
const blenderArea = document.querySelector("#blender-area");
const blenderOutcome = document.querySelector("#blender-outcome");
const blenderHiglight = document.getElementsByClassName("blender-area");

const DICES_PER_PAGE = 30;

// -------------------------------------------------
let currentDiceBoard = [];

let currentBlender;

let blenderResult;

let currentPage = 1;


// takes hero avialable dices, rolls them and pushes to dice array
function rollDices() {
  if (currentGameSettings.rollAvialable) {
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
    renderDiceBoard();
    callAllDragables();
  }
  currentGameSettings.rollAvialable = false;
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
  updateBlenderArray();

  if (currentBlender.length === 2) {
    const blackDice = { color: "black", id: currentGameSettings.diceId };
    const sum = parseInt(currentBlender[0]) + parseInt(currentBlender[1]);
    blackDice.roll = Math.floor(sum / 2);
    const diceWord = setDicePhrase(blackDice.roll);
    blackDice.dicePhrase = diceWord;
    const diceHtml = createDiceHtml(blackDice);

    blenderOutcome.appendChild(diceHtml);
    clearBlender();
    currentGameSettings.diceId++;
    renderDiceBoard();
    addNewEventListeners("reset");
  } else {
    blenderHiglight.classList.add("highlight-blender");
    setTimeout(() => {
      blenderHiglight.classList.remove("highlight-blender");
    }, 1000);
  }
}



function renderDicePage(pageNumber) {
  diceArea.innerHTML = "";
  const startIndex = (pageNumber - 1) * DICES_PER_PAGE;
  const endIndex = Math.min(startIndex + DICES_PER_PAGE, currentDiceBoard.length);
  for (let i = startIndex; i < endIndex; i++) {

    const mainDiv = createDiceHtml(currentDiceBoard[i]);
    diceArea.appendChild(mainDiv);
  }
}

function renderDiceBoard() {
  diceArea.innerHTML = "";
  const totalPages = Math.ceil(currentDiceBoard.length / DICES_PER_PAGE);
  let currentPage = 1;
  renderDicePage(currentPage);
  if (totalPages > 1) {
    const pagination = document.createElement("div");
    pagination.classList.add("pagination");
    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement("a");
      pageLink.href = "#";
      pageLink.textContent = i;
      if (i === currentPage) {
        pageLink.classList.add("active");
      }
      pageLink.addEventListener("click", function() {
        currentPage = i;
        renderDicePage(currentPage);
        const activeLink = pagination.querySelector(".active");
        if (activeLink) {
          activeLink.classList.remove("active");
        }
        pageLink.classList.add("active");
      });
      pagination.appendChild(pageLink);
    }
    diceArea.appendChild(pagination);
  }
}


function createPaginationHtml() {
  const totalPages = Math.ceil(currentDiceBoard.length / DICES_PER_PAGE);
  let html = "";
  for (let i = 1; i <= totalPages; i++) {
    const isActive = i === currentPage ? "active" : "";
    html += `<button class="${isActive}" onclick="currentPage = ${i}; renderDiceBoard()">${i}</button>`;
  }
  return html;
}



function createDiceHtml(element) {
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("dice");
  mainDiv.classList.add(`dice-${element.color}`);
  mainDiv.setAttribute("draggable", "true");
  mainDiv.setAttribute("data-dice-ammount", element.roll);
  mainDiv.setAttribute("data-dice-id", element.id);
  const diceSVG = dicePath(element.roll);
  mainDiv.innerHTML = diceSVG;
  return mainDiv;
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

function updateBlenderArray() {
  currentBlender = [];
  const dices = blenderArea.getElementsByClassName("dice");
  for (let i = 0; i < dices.length; i++) {
    const diceSize = dices[i].getAttribute("data-dice-ammount");
    currentBlender.push(diceSize);
    console.log(diceSize);
  }
}
