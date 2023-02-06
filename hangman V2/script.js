//Global variables
const numThemes = 6;        //number of themes
var chosenTheme;            //selected theme
var word;                   //selected word
var hearts;                 //number of hearts
var spaces;                 //number of spaces in a word
const completedWords = [];  //storing the words that have already been done by user

//Generating theme buttons

const themes = [
    ["School Subjects", "Emotions", "Theme 3", "Theme 4", "Theme 5", "Theme 6"],
    [0, 1, 2, 3, 4, 5]
];

const themeWords = [
    ["Mathematics", "English", "Science", "Art", "Physical-Education", "Algebra", "Biology", "Calculus", "Chemistry", "Film", "Computer-Science"],
    [],
    [],
    [],
    [],
    [],
]
    
$(document).ready(function(){

    //displaying the section that prompt the user to play
    startGame();

    //checking if the music button has been clicked
    $(".musicIcon").click(function () {
        $(this).toggleClass("inactive");
        var active = ($(this).hasClass("inactive")) ? false : true;
        toggleMusic(active);
    })

    //jquery will monitor if a theme button has been clicked
    $(".themeButton").click(function () {
        //getting the value of the clicked theme button
        selectedTheme = $(this).val();
        chosenTheme = selectedTheme;
        playGame();
    });

    //jquery will monitor if a alphabet button has been clicked
    $(".alphabetLetter").click(function () {
        //getting the value of the clicked alphabet button
        selectedTheme = $(this).val();
        console.log(selectedTheme);
    });

})

generateThemeButtons();
generateAlphabetButtons();

function generateThemeButtons() {
    //for loop creates 6 theme buttons and inserts them into the themeBox div in the html file
    for (let i = 0; i < numThemes; i++) {
        //creating a button element and assigning attribute values
        const themeButton = document.createElement("button");
        const node = document.createTextNode(themes[0][i]);
        themeButton.appendChild(node);
        themeButton.value = themes[1][i];
        themeButton.id = themes[1][i];
        themeButton.className = "themeButton";

        //appending the button to the html 
        const element = document.getElementById("themeBox");
        element.appendChild(themeButton);
    }
}

function generateAlphabetButtons() {
    for (let i = 65; i < 91; i++) {
        const alphabetButton = document.createElement("button");
        const currentLetter = String.fromCharCode(i);
        const node = document.createTextNode(currentLetter);
        
        alphabetButton.appendChild(node);
        alphabetButton.value = currentLetter;
        alphabetButton.id = currentLetter;
        alphabetButton.className = "alphabetLetter";

        //appending the button to the html 
        const element = document.getElementById("alphabetItems");
        element.appendChild(alphabetButton);
    }
}

function startGame()
{
    hideContainers();
    showContainer(".homeContainer");
    //playing audio
    //playMainMusic(true);
}

function pickTheme()
{
    console.log("Playing game");
    hideContainers();
    showContainer(".themeContainer");
}

function playGame()
{
    console.log(chosenTheme);
    hideContainers();
    showContainer(".playContainer");

    
    var positionChosen = false;
    while (!positionChosen)
    {
        var wordPosition = Math.floor(Math.random() * 10)
        if (!completedWords.includes(wordPosition))
        {
            positionChosen = true;
        }
    }
    
    //selecting a random word from the selected theme category
    word = themeWords[chosenTheme][wordPosition];
    completedWords.push(wordPosition);
    console.log(completedWords);

}

function gameOver()
{
    hideContainers();
    showContainer(".gameOverContainer");
}

//function hides all of the containers
function hideContainers()
{
    containers = document.getElementsByClassName("container");
    for (let i = 0; i < containers.length; i++) {
        containers[i].style.display = "none";
    }
}

//function displays the chosen container
function showContainer(className)
{
    document.querySelector(className).style.display = "flex";
}

//function plays or pauses the main music

function toggleMusic(active)
{
    if (active)
    {
        document.getElementById("upbeatMusic").play();
    }
    else 
    {
        document.getElementById("upbeatMusic").pause();

    }
}

