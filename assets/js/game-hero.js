"use strict";

// this is a a file that deals with hero modifications

//Hero object contains all the playable characters and their data: name, diceArray and life.
let heroes = [
    {
        name: "Grogu",
        diceStats: {
            red: "3",
            blue: "3",
            green: "3",
            yellow: "3",
            black: "0",
        },
        life: "30",
        image: "",
    },
    {
        name: "Mandalorian",
        diceStats: {
            red: "5",
            blue: "3",
            green: "2",
            yellow: "2",
            black: "0",
        },
        life: "30",
        image: "",
    },
    {
        name: "Luke Skywalker",
        diceStats: {
            red: "1",
            blue: "3",
            green: "5",
            yellow: "2",
            black: "1",
        },
        life: "30",
        image: "",
    },
    {
        name: "Rey",
        diceStats: {
            red: "3",
            blue: "1",
            green: "2",
            yellow: "5",
            black: "1",
        },
        life: "30",
        image: "",
    },
];

//Create html (modal) that lets player choose before starting the game (or could be separate page and saved to local storage)
//Provide all starting stats
var btn = document.getElementById("chooseHeroBtn");
btn.addEventListener("click", generateHeroModal);

function generateHeroModal(){
    var modal = document.getElementById("heroSelection");
    modal.style.display = "block";
    var span = document.getElementById("exit-hero-menu");
    span.addEventListener("click", function() {
        modal.style.display = "none"});
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    document.querySelectorAll(".selectHero").forEach(occurence => {
        let id = occurence.getAttribute('id');
        occurence.addEventListener('click', function() {
            renderHeroGameProfile(id)
        } );
    });
}

//Write function to render hero  profile in html according to player chosen hero at the start of turn

function renderHeroGameProfile(hero){
    console.log(hero)
    
}

//Saves updated hero stats for current game with added rewards
//function currentGameHeroData(playerHero){}

//Write function to add rewards to currentGameHeroData{}
//function addRewardsToHero()}

//Write function to clear hero profile allowing for new to be filled for next game
//function clearHeroProfile(){}


//Used when the current game reloaded or when round is over, and hero loses helth
//Updates current game hero profile stats
//function updateHeroGameProfile(currentGameHeroData)

//take currentGameHeroData{} And render new hero stats in html
//function renderHeroStats()
