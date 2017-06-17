

var computerWords  = ["tiger","elephant","rhinoceros","kangaroo","lion","panda"];
var listofGuesses =[];
var remainGuesses = 12;
var wins = 0;
var wordConstruct;
var charactorFreq ;
var userKeyPress = "";
var computerGuess ="";

//following function return an object with characters with no of repeates in the string
function getFrequency(string) {
    var freq = {};
    for (var i=0; i<string.length;i++) {
        var character = string.charAt(i);

        if (freq[character]) {
           freq[character]++;
        } else {
           freq[character] = 1;
        }
    }

    return freq;
}

function gameReset(){
    listofGuesses =[];
    remainGuesses = 12;
    computerGuess = computerWords[Math.floor(Math.random() * computerWords.length)];
    wordConstruct = fillArray(new Array(computerGuess.length));
    charactorFreq = getFrequency(computerGuess);
    userKeyPress = "";
    console.log("In Reset");             
}

//computer select Random word
 function computerChoice(){

    return computerWords[Math.floor(Math.random() * computerWords.length)];

 }

//create an array same length as computer generated word and assign "_" to initialise

function fillArray(constructArry){

        for(var i=0; constructArry.length > i; i++) {

            constructArry[i] = "_";
        }
    return constructArry;
}

//when page load first time computer select word
    computerGuess = computerChoice();
    console.log("Computer Word when page refreshed-->  "+computerGuess);

    charactorFreq = getFrequency(computerGuess);

    wordConstruct = fillArray(new Array(computerGuess.length));


    
    //Update browser with results
    function updateScoreBoard(){
        var htmlString = "";
        var guessStr ="";
        var wordStr ="";

        //process Guessing Word for display
        for(var i=0; i< wordConstruct.length; i++ ) {
            wordStr = wordStr + wordConstruct[i].toUpperCase() +" ";
        }

        console.log("Word construct -->"+wordStr);

        //process number of Guess so far
        for(var j=0; j< listofGuesses.length; j++ ) {
            guessStr = guessStr + listofGuesses[j].toUpperCase() +" ";
        }
        //console.log(guessStr);
        
        //crerate display html string
        htmlString = "<p> Wins :"+wins+"</p><p> Your Current Word :"+wordStr+"</p>"+
                
                        "<p> Guesses Left :"+remainGuesses+"</p><p>Your Guesses So Far :"+guessStr+"</p>";

        document.getElementById("results").innerHTML = htmlString;      
    }

  
//Display winning or losing message;
function displayMessage(msg){
        document.querySelector(".gamemessage").classList.add("message");
        document.querySelector(".gamemessage").innerHTML = msg;
        
  }

// When the user presses a key, it will run the following function...

document.onkeyup = function(event) {
    
   // Determine which key was pressed & change to lower case;
    userGuess = event.key.toLowerCase();

    console.log("Computer Choice-->  "+computerGuess);
    console.log("Guesses Remain --> "+remainGuesses);
    console.log("Frequncy arr  "+charactorFreq);


    if( remainGuesses > 0){

        if(remainGuesses===12){

            displayMessage(" ");
        }

        //check user repeat same key
        if(listofGuesses.indexOf(userGuess) < 0){
            //if the user guess letter exist in the word
            if(charactorFreq[userGuess] > 0) {

                //if the user guess does not repeat on the word
                if(charactorFreq[userGuess]===1){

                    //insert user correct guess to a new array with same index order as computer guess word
                    //wordConstruct.splice(computerGuess.indexOf(userGuess),0,userGuess);
                    wordConstruct[computerGuess.indexOf(userGuess)] = userGuess;
                    
                    
                    //add guess letter to the array
                    listofGuesses.push(userGuess);
                    remainGuesses--;

                    //if the there is no _ in the wordConstruct arry means User won.
                    if(wordConstruct.indexOf("_") < 0){
                        wins++;
                        //console.log(document.querySelector(".gamemessage"));

                        displayMessage("You are the Winner");
                        gameReset();
                        updateScoreBoard();
                        return;
                        
                    }else {

                        updateScoreBoard();
                    }

                    console.log( "Word Construct letter no repeat -->"+wordConstruct);

                }else{

                    var  noOfCharRepeat = charactorFreq[userGuess];
                    console.log("no of repeat user guess -->"+userGuess+"--"+noOfCharRepeat);

                    for(var i=0; computerGuess.length >i; i++ ) {

                        if(noOfCharRepeat > 0){
                            if(computerGuess[i] === userGuess){
                                wordConstruct[i]= userGuess;
                                //console.log("Value of i -->"+i);
                                noOfCharRepeat--;
                                
                            }

                            if(wordConstruct.indexOf("_") < 0){ 
                                wins++;
                                displayMessage("You are the Winner");
                                gameReset();  
                                updateScoreBoard();

                                break;
                            }

                        }else{

                            //add guess letter to the array
                            listofGuesses.push(userGuess);
                            remainGuesses--;
                            break;
                        }

                    } // End of the for loop


                } // end of charactorFreq[userGuess]===1

                if(remainGuesses===0){
                    console.log("no more guess left");
                    displayMessage("You lose the game.Try again");
                    gameReset();
                    updateScoreBoard();
                
                }else{
                                    
                    updateScoreBoard();
                }

            }else {

                console.log("wrong letter");
                
                //add guess letter to the array
                listofGuesses.push(userGuess);
                remainGuesses--;

                if(remainGuesses===0){
                    displayMessage("You lose the game.Try again");
                    gameReset();
                    updateScoreBoard();
                }
                 else
                {
                    updateScoreBoard();
                }

                

            } // End of charactorFreq[userGuess] > 0 
        
        }else{

            console.log("dup key");
        } // end (listofGuesses.indexOf(userGuess) < 0)

    }else{
        displayMessage("You lose the game.Try again");
        gameReset();
        updateScoreBoard();

    } // End remainGuesses > 0

};



