
let humanScore = 0;
let computerScore = 0;

function getRandomInt(end){
    return Math.floor(Math.random()*end);
}

function getComputerChoice(){
// Get a random number between 0 and 3 (exclusivly)
    let computerChoice = getRandomInt(3);
// Map it to the availabe choices
    switch(computerChoice){
        case 0:
            computerChoice = "Rock";
            break;
        case 1:
            computerChoice = "Paper";
            break;
        case 2:
            computerChoice = "Scissors";
            break;
        default:
            console.error("Invalid Random number!");
    }
    return computerChoice;
}

function userInputIsValid(userInput){
    try{
        userInput = userInput.toLowerCase();
        if(userInput === "rock" || userInput === "paper" || userInput === "scissors"){
            return true;
        }
    } catch(error){
        console.log("An Error Occured!");
    }
    console.log("Invalid Input");
    return false;
}

function formatUserChoice(userInput){
    userInput = userInput.toLowerCase();
    userInput = userInput.slice(0, 1).toUpperCase() + userInput.slice(1);
    return userInput;
}

function getHumanChoice(){
    let userInput;
    do{
        userInput = prompt("Your Choice!");
    } while(!userInputIsValid(userInput));

    userInput = formatUserChoice(userInput);

    return userInput;
}
