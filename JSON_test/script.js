// fetch('https://random-words5.p.rapidapi.com/getRandom', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
var randomNum = randomNumGenerator(5, 12);
const url = `https://www.wordgamedb.com/api/v1/words/?numLetters=`;
const url2 = `https://www.wordgamedb.com/api/v1/words/random`;
const url3 = 'https://api.dictionaryapi.dev/api/v2/entries/en/hello';
var dictionaryResult;
var word;
var category;

function randomNumGenerator(min, max)
{    
    return Math.floor(Math.random()*(max - min +1)) + min;
} 

//fetch(`${url}${randomNum}`).then(res => res.json()).then(data => console.log(data));


//var obj;
// //gets all words with random number of letters
// fetch(`${url}${randomNum}`)
//   .then(res => res.json())
//   .then(data => {
//     obj = data;
//    })
//   .then(() => {
//     console.log(obj);
//    });


var numLetters;
var numUniqueLetters;
var category;

//gets a random word
   fetch(url2)
  .then(res => res.json())
  .then(data => {
    numLetters = data.numLetters;
    word = data.word;
    category = data.category;
   })
  .then(() => {
    console.log(word);
    console.log("The number of letters in " + word + " is " + numLetters);
    console.log(category);
   })
   .then(()=>{
    numUniqueLetters = countUniqueLetters(word);
    console.log(numUniqueLetters);
   });

//function to count the number of unique letters in a word
function countUniqueLetters(str){
    let unique = ""; //create new string to store unique characters in the word
    for(let i = 0; i < str.length; i++){
        if(unique.includes(word[i])===false){
            unique += str[i]; //add unique letters to the new string
        }
    }
    console.log("The unique string is " + unique);
    let countedUnique = unique.length; //count the string length of the new string
    console.log("The number of unique letters is " + countedUnique);
    return countedUnique; //return the number of unique characters in the word
}


fetch("./data.json").then(res => res.json())
.then(data => console.log(data.phobias[1].word))
.then((data)=>{
    let selectedThemeVal = themes[0][chosenTheme];
    let randomNum = data[selectedThemeVal].length();
    let themeSet = data[selectedThemeVal][randomNum];
});