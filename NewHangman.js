// Wins: (# of times user guessed the word correctly).
// If the word is madonna, display it like this when the game starts: ___ ___ _.
// As the user guesses the correct letters, reveal them: m a d o _ _ a.
// Number of Guesses Remaining: (# of guesses remaining for the user).
// Letters Already Guessed: (Letters the user has guessed, displayed like L Z Y H).
// After the user wins/loses the game should automatically choose another word and make the user play it.
// these are declarations of vars

// --------------------- Variables below ----------------------
var wins = 0;
var losses = 0;
var gamesPlayed = 0;
var limit = 3;
var randomWord;
var guessesLeft;
var winMessage;

var userGuesses = [];
var placeHolderArr = [];
var randomWordArr = [];
var validLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');

// put images links in each of the index positions below
var images = ["assets/0HangPic.png", "assets/1HangPic.png", "assets/2HangPic.png", "assets/3HangPic.png",
    "assets/4HangPic.png", "assets/5HangPic.png", "assets/6HangPic.png", "assets/7HangPic.png",
    "assets/8HangPic.png"];
var activeImageIndex = 0;

// Array of words to be used in the game
var wordList = ['dog', 'row', 'jog', 'cow', 'grow','green','top','fun','words','theif','supai','can','codecamp'];


//------------------------- Start Game below --------------------

startGame();

document.onkeyup = function (event) {
console.log(randomWordArr);

    // store keystroke event
    var letterPressed = event.key;
    var letterPressed = letterPressed.toLowerCase();

    var isWinner = !placeHolderArr.includes('__');
    //    alert(isWinner);
    if (guessesLeft === 0 || isWinner === true) {
        document.getElementById("wins").innerHTML = wins;
        document.getElementById("losses").innerHTML = losses;


        return startGame();
    }

    // check for non-letters
    if (validLetters.includes(letterPressed) === false) {
        alert("The key pressed is NOT a letter");
        console.log(validLetters.includes(letterPressed) === false);
        return false;
    }
    // check for already pressed letters
    if (userGuesses.includes(letterPressed) === true) {
        alert("The key pressed was ALREADY selected");
        return false;
    }
    // put unique valid letter key into the user guess array
    userGuesses.push(letterPressed);
    console.log(userGuesses);
    document.getElementById("userGuesses").innerHTML = userGuesses.join(' ');

    // create var to hold info: "false" if NO match, "true" if matched
    var isCorrect = isGuessCorrect(letterPressed);
    console.log(isCorrect);
    console.log(isGuessCorrect(letterPressed));

    // var winMessage =  ('Keep Guessing!');
    
    // if wrong letter, increment vars
    if (isCorrect === false) {
        console.log(isCorrect);
        guessesLeft = guessesLeft - 1;
        activeImageIndex = activeImageIndex + 1;
        console.log(activeImageIndex);
        document.getElementById("guessesLeft").innerHTML = guessesLeft;
        changeImage();
        
        //alert("'isCorrect' is FALSE");
        // nested if wrong letter AND no more guesses, increment game vars and start new game
        if (guessesLeft === 0) {
            winMessage = ('Word Lost');
            losses = losses + 1;
            activeImageIndex = 8;
            changeImage();
            gamesplayed = wins + losses;
            //userGuesses = [];
            console.log(guessesLeft);
            console.log(losses);
            alert("Sorry, this word thief can't spell!");          
            //setTimeout(startGame,3000);        
            //return startGame();
        }
    }

    // Call function to update the DOM with the placeHolder array
    revealLetters(letterPressed);


    // fill var id to show in HTML
    console.log(placeHolderArr.join(' '));
    document.getElementById("showPlaceHolderArr").innerHTML = placeHolderArr.join(' ');
    document.getElementById("guessesLeft").innerHTML = guessesLeft;

    // WIN condition if NO BLANKS remain, then increment win counter and start new game
    if (placeHolderArr.includes("__") === false) {
        winMessage = ('Word success!');
        wins = wins + 1;
        console.log(wins);
        alert("This guy can spell!  You win");
        //return startGame();
    }
    document.getElementById("statusMessage").innerHTML = winMessage; 
}


// --------------------------- Game Cycle Done ----------------------------


// ************************ Functions below *******************************

// these are declarations of functions
// startGame resets the guess counter, and prepares for a new word
function startGame() {
    guessesLeft = 8;
    userGuessArr = [];
    userGuesses = [];
    randomWord = getRandomWord();
    randomWordArr = randomWord.split("");
    placeHolderArr = getPlaceHolderArr();
    winMessage = ('Keep Guessing!');
    document.getElementById("userGuesses").innerHTML = userGuesses; 
    document.getElementById("guessesLeft").innerHTML = guessesLeft; 
    document.getElementById("statusMessage").innerHTML = winMessage; 
    activeImageIndex = 0;
    changeImage();
    
    console.log(placeHolderArr);
    console.log(guessesLeft);
    console.log(userGuesses);
    console.log(randomWord);
}

// *******************************************
// Put blanks (for the number of letters in the selected word) as a placeholder for guesses 
function getPlaceHolderArr() {
    var placeHolderArr = [];
    for (let i = 0; i < randomWordArr.length; i++) {
        placeHolderArr.push('__');
        document.getElementById("showPlaceHolderArr").innerHTML = placeHolderArr.join(' '); 
    };
    return placeHolderArr;
}
// *******************************************
// Put the correctly guessed letter into the placeholder array at the right position
function revealLetters(letterPressed) {
    console.log(letterPressed);
    console.log(randomWordArr);
    for (let i = 0; i < randomWordArr.length; i++) {
        if (randomWordArr[i] === letterPressed) {
            placeHolderArr[i] = letterPressed;
            console.log(placeHolderArr);
        };
    };
}

// *******************************************
// This generates a random number to select a word from the wordList var
function getRandomWord() {
    var randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

// *******************************************
// This checks letter for a correct match in the word being evaluated
// If letter is matched, return true, otherwise return false

function isGuessCorrect(letterPressed) {
    for (let i = 0; i < randomWordArr.length; i++) {
        if (randomWordArr[i] === letterPressed) {
            console.log(randomWordArr);
            console.log(letterPressed);
            //alert("'isGuessCorrect' is TRUE");
            return true;
        };
    };
    console.log(randomWordArr);
    console.log(letterPressed);
    //alert("Letter not in the word --> isGuessCorrect FALSE");
    return false;
}

// *******************************************
// This increments the image to be shown from the image index
function changeImage() {
    document.getElementById("HangmanPic").setAttribute("src", images[activeImageIndex]);
}

// ************************ Functions above *******************************




