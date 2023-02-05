//Global variables
const numThemes = 6;

//Generating theme buttons

const themes = [
    ["Theme 1", "Theme 2", "Theme 3", "Theme 4", "Theme 5", "Theme 6"],
    [1, 2, 3, 4, 5, 6]
];

const themeWords = [
    ["Banana", "Dragon Fruit", "Strawberry"],
    [],
    [],
    [],
    [],
    [],
]
    


$(document).ready(function(){
    //jquery will monitor if a theme button has been clicked
    $(".themeButton").click(function () {
        //getting the value of the clicked theme button
        selectedTheme = $(this).val();
        console.log(selectedTheme);
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

function playGame()
{
    console.log("Playing game");
}



