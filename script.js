//Global variables
const url = `https://www.wordgamedb.com/api/v1/words/random`; //API to get words, category, and letter count
const numThemes = 6;            //number of themes
const maxGuesses = 5;
var chosenTheme;                //selected theme
var hint;                       //hint for the word
var word;                       //selected word from API call
var hearts = 5;                 //number of hearts
var spaces;                     //number of spaces in a word
var guessedLetters = [];        //storing the words that have already been done by user
var incorrectGuesses = 0;
var uniqueLettersWord;          //number of unique letters in word to guess
var uniqueLettersGuessed = 0 ;  //number of unique letters guessed correctly 
var wordStatus = null;
var numUniqueLetters = 3;       //variable stores the number of unique letters that the current word has
var uniqueLetterCounter = 0;    //counter stores the number of unique letters that have been guessed
var musicToggleSelection = true;//variable stores the current music toggle selection 

//Typewriter vars
var i = 0;
var txt = "Help Bob write his essay!";
var speed = 80;

//available themes 
const themes = [
    ["Idioms", "Phobias", "Latin", "Art", "Geography", "Random"],
    [0, 1, 2, 3, 4, 5]
];

//defining DOM elements
var hearts = document.getElementsByClassName("heart");
var musicIcons = document.getElementsByClassName("musicIconImg");
var wordDisplay = document.getElementById("word");

//getting DOM sounds
var mainMusic = document.getElementById("upbeatMusic");
var drawLine = document.getElementById("drawLine");
var gameOverSound = document.getElementById("gameOver");
var correctLetterSound = document.getElementById("correctLetter");
var incorrectLetterSound = document.getElementById("incorrectLetter")

$(document).ready(function(){
    //generating the HTML buttons
    generateThemeButtons();
    generateAlphabetButtons();
    toggleMusic(true);

    //displaying the section that prompts the user to play
    startGame();
    setTimeout(function(){
        typewriter();
    }, 500);

    //checking if the music button has been clicked
    $(".musicIcon").click(function () {
        $(this).toggleClass("inactive");
        musicToggleSelection = ($(this).hasClass("inactive")) ? false : true;
        toggleMusic(musicToggleSelection);
    })

    //jquery will monitor if a theme button has been clicked
    $(".themeButton").click(function () {
        //getting the value of the clicked theme button
        var selectedTheme = $(this).val();
        chosenTheme = selectedTheme;
        console.log(selectedTheme);
        console.log(chosenTheme);
        drawLine.play();
        playGame();
    });

    //jquery will monitor if a theme button has been clicked
    $(".hintIcon").click(function () {
        $('#hintModal').modal('toggle');
        console.log("Hint modal activated");
        console.log(hint);
        $("#hintText").html(hint);
    });

    //jquery will monitor if a alphabet button has been clicked
    $(".alphabetLetter").click(function () {
        //getting the value of the clicked alphabet button
        var selectedLetter = $(this).val();
        console.log(selectedLetter);
        guessLetter(selectedLetter);
        guessedWord();
    });

    //checking for button hovers to play sound
    $("#play, #playAgain").mouseenter(function() {
        drawLine.play();
    });
})


//function generates buttons for the themes
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

//function generates alphabet letter buttons
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

//from: https://www.w3schools.com/howto/howto_js_typewriter.asp 
function typewriter()
{
    if(i <txt.length)
    {
        document.getElementById("tagLine").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typewriter, speed);
    }
}

//function displays the home container
function startGame()
{
    //hiding all of the containers expect for the home container
    hideContainers();
    showContainer(".homeContainer");
}

//function displays the theme container
function pickTheme()
{
    hideContainers();
    showContainer(".themeContainer");
    //updating the sound for when the player goes to theme container from gameOver container 
    gameOverSound.pause();
    toggleMusic(musicToggleSelection);
}

//function displays the play container, resets variables and does API calls
function playGame()
{
    //resetting all variables
    guessedLetters = [];  
    incorrectGuesses = 0;
    uniqueLettersWord; 
    uniqueLettersGuessed = 0 ; 
    wordStatus = null;
    uniqueLetterCounter = 0;     

    if(chosenTheme == 5) //if selected theme is "Random"
    {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        numLetters = data.numLetters;
        word = data.word;
        hint = data.category;
        $("#themeText").html(themes[0][chosenTheme]); //display selected theme on screen
        })
    .then(() => {
        console.log(word);
        console.log("The number of letters in " + word + " is " + numLetters);
        console.log("The hint is " + hint);
        })
    .then(()=>{
        numUniqueLetters = countUniqueLetters(word);
        console.log("Unique letters ", numUniqueLetters);
        })
   .then(()=>{
        //to include code for what happens after JSON response
        resetVisualElements();
        hideContainers();
        showContainer(".playContainer");
        switchExpression();
        guessedWord();
        });
    }
    else //if the theme selected is not random
    {
    fetch('./data.json') //fetch from local JSON file
    .then(res => res.json())
    .then(data => {
        let selectedThemeVal = themes[0][chosenTheme]; //get string value of chosen them
        console.log(selectedThemeVal);
        let themeSetSize = data[""+selectedThemeVal+""].length; //get the number of word entries in the chosen theme set
        console.log("The number of entries in " + selectedThemeVal + " is " + themeSetSize);
        randomNum = Math.floor(Math.random()*themeSetSize); //randomise the word selected from the theme set
        console.log(randomNum);
        hint = data[""+selectedThemeVal+""][randomNum].hint; //get the hint from the selected word
        console.log("The hint is " + hint);
        word = data[""+selectedThemeVal+""][randomNum].word; //get selected word
        console.log("The word is " + word);
        numLetters = word.length; //get length of word
        $("#themeText").html(themes[0][chosenTheme]); //display theme selected on screen
        })
    .then(() => {
        console.log(word);
        console.log("The number of letters in " + word + " is " + numLetters);
        console.log(hint);
        })
    .then(()=>{
        numUniqueLetters = countUniqueLetters(word.toUpperCase());
        console.log("Unique letters ", numUniqueLetters);
        })
   .then(()=>{
        //to include code for what happens after JSON response
        resetVisualElements();
        hideContainers();
        showContainer(".playContainer");
        switchExpression();
        guessedWord();
    });
    }
}

//function resets the alphabet letter styling and the hearts
function resetVisualElements(){
    //resetting all alphabet buttons
    var alphabetButtons = document.getElementsByClassName("alphabetLetter")
    for (let i = 0; i < alphabetButtons.length; i++)
    {
        alphabetButtons[i].disabled = false;
        alphabetButtons[i].className = "alphabetLetter active";
        alphabetButtons[i].style.color = "white";
    }

    //resetting all of the hearts
    for (let i = 0; i < hearts.length; i++)
    {
        hearts[i].src = "visualRecources/filledHeart.png";
    }
}

//function displays the gameOver container and game over logic
function gameOver()
{
    hideContainers();
    showContainer(".gameOverContainer");
    //animation bob blinks
    bobBlink();
    //turning off main music
    toggleMusic(false);
    //playing game over music
    gameOverSound.currentTime = 0;
    gameOverSound.play();
    //displaying the correct word
    $("#wordReveal").html(word);
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

//function plays or pauses the main music and selects the corresponding icon
function toggleMusic(active)
{
    if (active)
    {
        mainMusic.play();
        for (let i = 0; i < musicIcons.length; i++) {
            musicIcons[i].src = "visualRecources/musicIcon.png";
            musicIcons[i].style.height = "30px";
        }
    }
    else 
    {
        mainMusic.pause();
        for (let i = 0; i < musicIcons.length; i++) {
            musicIcons[i].src = "visualRecources/musicIconSlash.png";
            musicIcons[i].style.height = "31px";
        }
    }
}

//function displays the guessed letters or underscores based on how much the user has guessed
function guessedWord()
{
    wordStatus = word.toUpperCase().split('').map(function (letter) {
        //checking for spaces
        if (letter == ' ')
        {
            return  "&nbsp&nbsp&nbsp";
        }
        //checking if the letter has been guessed
        if (guessedLetters.indexOf(letter) >= 0 )
        {
            return letter;
        }
        else {
            return " _ ";
        }
    }).join('');
    wordDisplay.innerHTML = wordStatus; 
}

//function handles what happens when player clicks on an alphabet letter button
function guessLetter(letter)
{
    var currentLetterButton = document.getElementById(letter);

    //checking if word contains the the guessed letter 
    if (word.toUpperCase().includes(letter) && !guessedLetters.includes(letter))
    {
        guessedLetters.push(letter);
        uniqueLetterCounter++;
        currentLetterButton.style.color = "var(--correctGuess)";
        //checking if the word has been fully guessed
        if (uniqueLetterCounter >= numUniqueLetters)
        {
            winState();
        }
        else 
        {
            correctLetterSound.play();
        }
    }
    //if the word does not contain the guessed letter
    if(!word.toUpperCase().includes(letter))
    {
        incorrectGuesses++;
        removeHeart();
        switchExpression();
        currentLetterButton.style.color = "var(--wrongGuess)";
        //checking if the user has reached the limit of letter guesses 
        if(incorrectGuesses == maxGuesses)
        {
            gameOver();
        }
        else {
            incorrectLetterSound.play();
        }
        document.getElementById("hmph").classList.add("hmph");
        setTimeout(removeHmph, 900)        
    }
    //disabling the button that was just clicked
    currentLetterButton.disabled = true;
    currentLetterButton.className = "alphabetLetter inactive";
}

//function removes the hmph visual
function removeHmph()
{
    document.getElementById("hmph").classList.remove("hmph");
}

//function switches the heart img src 
function removeHeart() 
{
    document.getElementById("heart" + incorrectGuesses).src = "visualRecources/unfilledHeart.png";
}

//function switches bob's expression
function switchExpression()
{
    if(incorrectGuesses < 5)
    {
        document.getElementsByClassName("bobStage")[0].src = "visualRecources/bobStage"+(incorrectGuesses+1)+".png";
    }
}

//function to display modal popup for when the player guesses the word correctly
function winState()
{
    document.getElementById("correct").play();
    $('#winModal').modal('show');
    $('#winModal').on('hidden.bs.modal', function(){
        playGame();
    })
}

//function to count the number of unique letters in a word
function countUniqueLetters(str)
{
    //create new string to store unique characters in the word
    let unique = ""; 
    for(let i = 0; i < str.length; i++){
        if(unique.includes(str[i])===false && str[i] != " "){
            //add unique letters to the new string
            unique += str[i]; 
        }
    }
    console.log("The unique string is " + unique);
    let countedUnique = unique.length; //count the string length of the new string
    console.log("The number of unique letters is " + countedUnique);
    return countedUnique; //return the number of unique characters in the word
}

//function handles the bob blink's on gameOver container
function bobBlink()
{
    $("#bobEyes").attr({"src":"visualRecources/bobEyesClosed2.png"});
    setTimeout(bobDevastated, Math.random()*(800-100)+100);
}

function bobDevastated()
{
    $("#bobEyes").attr({"src":"visualRecources/bobEyesOpen.png"});
    setTimeout(bobBlink,Math.random()*(2000-100)+100);
}