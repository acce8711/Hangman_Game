// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '972210ba26msha5a5c1a70185565p1617a2jsn1486e8551de0',
// 		'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
// 	}
// };

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
    dictionaryResult = data;
    numLetters = data.numLetters;
    word = data.word;
    category = data.category;
   })
  .then(() => {
    console.log(dictionaryResult);
    console.log(word);
    console.log(numLetters);
    console.log(category);
   });

numUniqueLetters = countUniqueLetters();

function countUniqueLetters(){
    //for loop to loop through for number of letters in the word
    //count number of unique letters
}
