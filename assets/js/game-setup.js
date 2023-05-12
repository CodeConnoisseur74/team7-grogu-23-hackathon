"use strict";

// Main and staring file seting global variables

// Starting game settings
const gameSettings = {
    score: 0,
    level: 0,
    diceArrangment: size
}


// Loaded game settings
const currentGameSettings = {
    
}


// Is used to find out random number
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


window.addEventListener("load", () => {
    // Code to be added later
})


function endRound() {
    calculateHealth() // Not done yet
    calculateScoreGained() // Not done yet
    renderGameScore() // Not done yet
    addGameLevel()
    clearVillainProfile()
    updateHeroGameProfile() // Not done yet
    renderHeroStats() // Not done yet
}


function addGameLevel(){
    currentGameSettings.level++
}


function clearVillainProfile(){
    const villianImage= document.getElementById("villian-image")
    const villianDescription= document.getElementById("villian-description")
    villianImage.innerHTML= ""
    villianDescription.innerHTML= ""
}


