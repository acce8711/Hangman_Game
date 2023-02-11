//Global variables
const url = `https://www.wordgamedb.com/api/v1/words/random`; //API to get words, category, and letter count
const numThemes = 6;        //number of themes
// const winModal = document.getElementById("#winModal"); //winModal
var chosenTheme;            //selected theme
var category;              //category from API call
var word;                   //selected word from API call
var hearts = 5;                 //number of hearts
var spaces;                 //number of spaces in a word
var guessedLetters = [];  //storing the words that have already been done by user
var incorrectGuesses = 0;
var uniqueLettersWord; //number of unique letters in word to guess
var uniqueLettersGuessed = 0 ; //number of unique letters guessed correctly 
var answer = "banana"; //word used for testing
var wordStatus = null;
var numUniqueLetters = 3; //variable stores the number of unique letters that the current word has
var uniqueLetterCounter = 0;  //counter stores the number of unique letters that have been guessed


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
        var selectedTheme = $(this).val();
        chosenTheme = selectedTheme;
        playGame();
    });

    //jquery will monitor if a theme button has been clicked
    $(".hintIcon").click(function () {
        $('#hintModal').modal('toggle');
        console.log("Hint modal activated");
        console.log(category);
        $("#categoryHint").html(category);
    });

    //jquery will monitor if a alphabet button has been clicked
    $(".alphabetLetter").click(function () {
        //getting the value of the clicked alphabet button
        var selectedLetter = $(this).val();
        console.log(selectedLetter);
        guessLetter(selectedLetter);
        guessedWord();
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
        alphabetButton.className = "alphabetLetter active";

        //appending the button to the html 
        const element = document.getElementById("alphabetItems");
        element.appendChild(alphabetButton);
    }
}

function generateHearts() {

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
    //resetting all variables
    guessedLetters = [];  //storing the words that have already been done by user
    incorrectGuesses = 0;
    uniqueLettersWord; //number of unique letters in word to guess
    uniqueLettersGuessed = 0 ; //number of unique letters guessed correctly 
    wordStatus = null;
    //numUniqueLetters = 3; //variable stores the number of unique letters that the current word has
    uniqueLetterCounter = 0;     

    fetch(url)
    .then(res => res.json())
    .then(data => {
        numLetters = data.numLetters;
        //word = data.word;
        word = "hello bob";
        category = data.category;
        let hint = category.toUpperCase();
        $("#hint").html(hint);
        })
    .then(() => {
        console.log(word);
        console.log("The number of letters in " + word + " is " + numLetters);
        console.log(category);
        })
    .then(()=>{
        numUniqueLetters = countUniqueLetters(word);
        console.log("Unique letters ", numUniqueLetters);
        })
   .then(()=>{
        //to include code for what happens after JSON response
        //resetting all alphabet buttons
        var alphabetButtons = document.getElementsByClassName("alphabetLetter")
        for (let i = 0; i < alphabetButtons.length; i++)
        {
            alphabetButtons[i].disabled = false;
            alphabetButtons[i].className = "alphabetLetter active";
            alphabetButtons[i].style.color = "white";
        }

        //resetting all of the hearts
        var hearts = document.getElementsByClassName("heart");
        for (let i = 0; i < hearts.length; i++)
        {
            hearts[i].src = "visualRecources/filledHeart.png";
        }

        console.log(chosenTheme);
        hideContainers();
        showContainer(".playContainer");
        switchExpression();

        /*
        var positionChosen = false;
        while (!positionChosen)
        {
            var wordPosition = Math.floor(Math.random() * 10)
            if (!completedWords.includes(wordPosition))
            {
                positionChosen = true;
            }
        }
        */
        //selecting a random word from the selected theme category
        /*
        word = themeWords[chosenTheme][wordPosition];
        completedWords.push(wordPosition);
        console.log(completedWords);
        */
        guessedWord();
    });
}

//function to show game over page
function gameOver()
{
    hideContainers();
    $("#wordReveal").html(word);
    showContainer(".gameOverContainer");
    //button in game over page to reset variables and game state
}

//function to show win state popup
function winState()
{
    showContainer(".winStateContainer");
    //show modal
    $(winModal).modal('show');
    //add document.addEventListener to click anywhere to close modal and restart game
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
    var musicIcons = document.getElementsByClassName("musicIcon");

    if (active)
    {
        document.getElementById("upbeatMusic").play();
        for (let i = 0; i < musicIcons.length; i++) {
            musicIcons[i].src = "visualRecources/musicIcon.png";
            musicIcons[i].style.height = "30px";
        }
    }
    else 
    {
        document.getElementById("upbeatMusic").pause();
        for (let i = 0; i < musicIcons.length; i++) {
            musicIcons[i].src = "visualRecources/musicIconSlash.png";
            musicIcons[i].style.height = "31px";
        }
        //winState();
    }
}

function guessedWord() {
    wordStatus = word.toUpperCase().split('').map(function (letter) {
        if (letter == ' ')
        {
            
            return  "&nbsp&nbsp&nbsp";
        }
        if (guessedLetters.indexOf(letter) >= 0 )
        {
            return letter;
        }
        else {
            return " _ ";
        }
    }).join('');
        
    /*
        guessedLetters.indexOf(letter) >= 0 ? letter : " _ ")).join('');*/
    document.getElementById("word").innerHTML = wordStatus;
    
}

function guessLetter(letter) {
    var currentLetterButton = document.getElementById(letter);

    if (word.toUpperCase().includes(letter) && !guessedLetters.includes(letter))
    {
        console.log("I ", letter, " am included !");
        guessedLetters.push(letter);
        uniqueLetterCounter++;
        console.log(uniqueLetterCounter);
        currentLetterButton.style.color = "var(--correctGuess)";
        if (uniqueLetterCounter >= numUniqueLetters)
        {
            winState();
        }
        //get word, create variable to store number of unique letters
        //create variable for unique letter counter
        //if letter is guessed correctly, unique letter counter is incremented
        //if number of unique letters guessed correctly = number of unique letters in word
        //call winState()
        //winState() shows modal popup with message and "click anywhere to replay"
    }
    if(!word.toUpperCase().includes(letter))
    {
        incorrectGuesses++;
        console.log(incorrectGuesses);
        removeHeart();
        switchExpression();
        checkMaxGuesses();
        currentLetterButton.style.color = "var(--wrongGuess)";
        
    }
    //disabling the button that was just clicked
    currentLetterButton.disabled = true;
    currentLetterButton.className = "alphabetLetter inactive";
    
}

function removeHeart() 
{
    console.log("hello noob");
    document.getElementById("heart" + incorrectGuesses).src = "visualRecources/unfilledHeart.png";
}

function switchExpression()
{
    document.getElementsByClassName("playContainer")[0].style.background = "url(visualRecources/playPage"+(incorrectGuesses+1)+".jpg)";
    document.getElementsByClassName("playContainer")[0].style.backgroundSize = "cover";
}

function checkMaxGuesses()
{
    if (incorrectGuesses == 5)
    {
        gameOver();
    }
}

function winState()
{
    console.log("you win!");
    $('#winModal').modal('show');
    $('#winModal').on('hidden.bs.modal', function(){
        startGame();
    })
}

//function to count the number of unique letters in a word
function countUniqueLetters(str){
    let unique = ""; //create new string to store unique characters in the word
    for(let i = 0; i < str.length; i++){
        if(unique.includes(word[i])===false && word[i] != " "){
            unique += str[i]; //add unique letters to the new string
        }
    }
    console.log("The unique string is " + unique);
    let countedUnique = unique.length; //count the string length of the new string
    console.log("The number of unique letters is " + countedUnique);
    return countedUnique; //return the number of unique characters in the word
}

    $(document).click(function(){
        console.log("rubber duck");
        //const myModal = new bootstrap.Modal(document.getElementById('winModal'));
        //$('.modal').modal('show');
    })


//Themes JSON trial

fetch("./data.json").then(res => {
    return res.json();
}).then(data => console.log(data))
.then(data => console.log(data));