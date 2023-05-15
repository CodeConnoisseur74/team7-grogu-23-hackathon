"use strict";

// this is a a file that deals with drag and drop functions

let draggables = document.getElementsByClassName("dice");
let combatBox = document.getElementsByClassName("combat-box");
const blenderField = document.getElementById("blender-area");
const diceField = document.querySelector("#dice-area");
const screen = document.querySelector("#game-size-container");

// game square coorodinates that are used with drag start
let diceCoordinates = {};

// game board cooridantes used with drag start
let dropBoxesCenters = [];

// dragable element saved
let draggableEL;

function preventOnDragStart(draggables) {
  for (let i = 0; i < draggables.length; i++) {
    draggables[i].ondragstart = function () {
      return false;
    };
  }
}

function callAllDragables() {
  draggables = document.getElementsByClassName("dice");
  addNewEventListeners("reset");
}

function callAllDropables() {
  combatBox = document.querySelectorAll(".combat-box");
  findDropBoxesCenters();
}

// add to main loading page

// Requires remove/add/reset action to work. effects draggable squares
function addNewEventListeners(action) {
  const draggables = document.getElementsByClassName(`dice`);
  for (let i = 0; i < draggables.length; i++) {
    if (action === `remove`) {
      draggables[i].removeEventListener("pointerdown", onPointerDown);
      draggables[i].removeEventListener("pointerup", pointerup);
    } else if (action === `add`) {
      draggables[i].addEventListener("pointerdown", onPointerDown);
      draggables[i].addEventListener("pointerup", pointerup);
      preventOnDragStart(draggables);
    } else if (action === `reset`) {
      draggables[i].removeEventListener("pointerdown", onPointerDown);
      draggables[i].removeEventListener("pointerup", pointerup);

      draggables[i].addEventListener("pointerdown", onPointerDown);
      draggables[i].addEventListener("pointerup", pointerup);
      preventOnDragStart(draggables);
    } else {
      throw new Error(`Event listener action was not given`);
    }
  }
}

// reacts when the pointers is pressed on one of the shapes
function onPointerDown(e) {
  console.log("pointerDown");
  e.preventDefault();
  // temporary

  diceCoordinates = {};

  draggableEL = getTargetElement(e);

  const rect = draggableEL.getBoundingClientRect();

  draggableEL.style.width = JSON.parse(JSON.stringify(rect.width)) + `px`;
  draggableEL.style.height = JSON.parse(JSON.stringify(rect.height)) + `px`;

  draggableEL.style.position = "absolute";
  draggableEL.style.zIndex = 200;

  // allows pointermove function to set position of shape
  diceCoordinates.draggableOffsetX = e.pageX - rect.left;
  diceCoordinates.draggableOffsetY = e.pageY - rect.top;

  draggableEL.style.left = e.pageX - diceCoordinates.draggableOffsetX + `px`;
  draggableEL.style.top = e.pageY - diceCoordinates.draggableOffsetY + `px`;

  // recording shapeWindow element to use once element is droped otside dropable places
  diceCoordinates.parent = draggableEL.parentElement;

  // recording were pointer was clicked
  diceCoordinates.pointerDownX = e.pageX;
  diceCoordinates.pointerDownY = e.pageY;
  diceCoordinates.element = draggableEL;

  recordDiceCenter(draggableEL);

  document.addEventListener("pointermove", pointerMove);
}

function recordDiceCenter(element) {
  const info = {};
  const rect = element.getBoundingClientRect();

  // calculating half distance to the center
  info.halfX = rect.width / 2;
  info.halfY = rect.height / 2;

  // calculating center cordinates of the square at the time of pointer down
  info.cordinateX = rect.left + info.halfX;
  info.cordinateY = rect.top + info.halfY;

  // calculationg distance from square center to the pointer
  info.distanceX = info.cordinateX - diceCoordinates.pointerDownX;
  info.distanceY = info.cordinateY - diceCoordinates.pointerDownY;

  // taking id for the element
  //   info.id = parseInt(element.classList[1].split("-")[1]);

  // pushing all collected data to an array
  diceCoordinates.elementDimentions = info;
}

// pointerMove purpose is to find the pointer location on the screen
function pointerMove(e) {
  console.log("pointerMove");
  e.preventDefault();
  for (let i = 0; i < combatBox.length; i++) {
    combatBox[i].classList.remove(`highlighted-square`);
  }
  blenderField.classList.remove(`highlighted-square`);
  diceField.classList.remove(`highlighted-square`);

  draggableEL.style.left = e.pageX - diceCoordinates.draggableOffsetX + `px`;
  draggableEL.style.top = e.pageY - diceCoordinates.draggableOffsetY + `px`;

  checkCenterBoxes(e);
}

//Drag end works like onMouseUp and does all events right after.
// used this instead of pointer up because while using draggable property pointer events dont triger.
function pointerup(e) {
  for (let i = 0; i < combatBox.length; i++) {
    combatBox[i].classList.remove(`highlighted-square`);
  }
  blenderField.classList.remove(`highlighted-square`);
  diceField.classList.remove(`highlighted-square`);

  draggableEL.style.removeProperty("position");
  draggableEL.style.zIndex = "auto";
  draggableEL.style.removeProperty("left");
  draggableEL.style.removeProperty("top");

  // getting mosue cordinates during the drop
  const pointerX = e.pageX;
  const pointerY = e.pageY;

  addNewEventListeners(`reset`);

  // drops dice inside new element
  const dropTarget = getTargetElement(e);

  const matchedActiveSquares = findingMacthingSquares(pointerX, pointerY);

  if (matchedActiveSquares[1]) {
    matchedActiveSquares[0].appendChild(dropTarget);
    callAllDropables();
    renderFightingBadges();
  }
  // cleaning up data after drag ended
  diceCoordinates = {};
  document.removeEventListener("pointermove", pointerMove);

  draggableEL = "";

  // cleaning up data after drag ended
  diceCoordinates = {};
}

/**
 * Records all drop boxes outer edges in to "dropBoxesCenters" array for later use to match with dragable boxes
 * should be only use at the begining of the game and when the screen is being resized
 */
function findDropBoxesCenters() {
  // clears old information
  dropBoxesCenters = [];

  // loops though all boxes to return information
  for (let i = 0; i < combatBox.length; i++) {
    const info = recodDropDimentions(combatBox[i]);

    info.color = checkDropAreaColor(combatBox[i]);
    info.spaceCheck = checkForSpace(combatBox[i]);
    info.diceScore = calculateBoxesScore(combatBox[i])[0];
    info.requiredScore = calculateBoxesScore(combatBox[i])[1];

    dropBoxesCenters.push(info);
  }

  const info2 = recodDropDimentions(blenderField);
  info2.color = "universal";
  info2.spaceCheck = checkForSpace(blenderField, true);
  info2.diceScore = 0;
  dropBoxesCenters.push(info2);
  const info3 = recodDropDimentions(diceField);
  info3.color = "universal";
  info3.spaceCheck = Math.pow(10, 100);
  info3.diceScore = 0;
  dropBoxesCenters.push(info3);
}

function recodDropDimentions(e) {
  // creating object for each of the the elements

  const info = {};

  // check later after merge --------------------------------------------------------------------------------------
  // info.color = combatBox[i].classList[1].split("-")[0];

  const rect = e.getBoundingClientRect();

  // recording square dimention coordinates
  info.left = rect.left;
  info.right = rect.right;
  info.top = rect.top;
  info.bottom = rect.bottom;

  info.element = e;
  return info;
}

function checkCenterBoxes(e) {
  // The fallowing code determines if center of dragable boxes are within dropboxes.
  // getting pointer cordinates during drag
  const pointerX = e.pageX;
  const pointerY = e.pageY;

  const matchedActiveSquares = findingMacthingSquares(pointerX, pointerY);
  if (matchedActiveSquares[1]) {
    matchedActiveSquares[0].classList.add(`highlighted-square`);
  }
}

/**
 * Test dragable squares center location against dropboxes area to see which ones are maching
 * @param {number} mouseX Mouse X coordinates
 * @param {number} mouseY Mouse Y coordinates
 * @returns array of elements matched, and true or false if all elements maches and the shape can be placed.
 */
function findingMacthingSquares(mouseX, mouseY) {
  let matchedActiveSquares = "";
  // looping thought dragable boxes
  const eDim = diceCoordinates.elementDimentions;

  const dragColor = checkDragableColor();

  const boxCenterX = mouseX + eDim.distanceX;
  const boxCenterY = mouseY + eDim.distanceY;

  dropBoxesCenters.forEach((e) => {
    // checkign if the dragable box center coordinates are within a dropbox square
    // added 1% reduction in avialable size due to shapes catching squares they should not
    const condition1 = boxCenterX > e.left * 1.01;
    const condition2 = boxCenterX < e.right / 1.01;
    const condition3 = boxCenterY > e.top * 1.01;
    const condition4 = boxCenterY < e.bottom / 1.01;

    const withinArea = condition1 && condition2 && condition3 && condition4;

    const boxColor = e.color;
    const spaceCheck = e.spaceCheck;

    const colorCondition = boxColor == "universal" || boxColor == dragColor || dragColor == "black";

    if (withinArea && colorCondition && spaceCheck) {
      matchedActiveSquares = e.element;
    }
  });
  const dropableOrNot = !(matchedActiveSquares === "");
  return [matchedActiveSquares, dropableOrNot];
}

function getTargetElement(e) {
  let targetElement;
  if (e.target.tagName == "div") {
    targetElement = e.target;
  } else if (e.target.tagName == "svg") {
    targetElement = e.target.parentElement;
  } else if (e.target.tagName == "circle" || e.target.tagName == "path") {
    targetElement = e.target.parentElement.parentElement;
  } else {
    console.error("Error no dragable elemnt was found ");
  }
  return targetElement;
}

function checkCorrectArea() {}

// Records the colour of dragable dice
function checkDragableColor() {
  const color = draggableEL.classList[1].split("-")[1];
  return color;
}

function checkDropAreaColor(element) {
  const color = element.classList[1].split("-")[0];
  return color;
}

function checkForSpace(element, blender) {
  let space;
  if (blender) {
    space = 1;
  } else {
    space = element.classList[0].split("-")[1];
  }

  const ammount = element.children.length;

  return parseInt(space) + 1 > ammount;
}

function calculateBoxesScore(element) {
  let childrenSum = 0;
  const divs = element.getElementsByTagName("div");

  for (let i = 0; i < divs.length; i++) {
    childrenSum += parseInt(divs[i].getAttribute("data-dice-ammount"));
  }
  const parentSum = element.getAttribute("data-area-no");
  return [childrenSum, parentSum];
}
