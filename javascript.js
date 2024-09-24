const playerChoices = document.querySelectorAll(".player-content > .choices > ul > li");
const computerChoices = document.querySelectorAll(".computer-content > .choices > ul > li");
const computerEndChoice = document.querySelector(".computer-content > .end-choice");
const computerScoreElement = document.querySelector(".computer-content > .info > .score");
const playerEndChoice = document.querySelector(".player-content > .end-choice");
const playerScoreElement = document.querySelector(".player-content > .info > .score");
const playButton = document.querySelector("#play");
const roundTracker = document.querySelector(".round");

let currentRound = 1;
let humanScore = 0;
let computerScore = 0;
let winScore = 5;

const possibleChoices = {
    Rock: "✊",
    Paper: "✋",
    Scissors: "✌"
}

const possibleOutcomes = {
    PlayerWin: [1, 0],
    PlayerLose: [0, 1],
    Draw: [0, 0]
}

playerChoices.forEach(choice => {
    choice.addEventListener("click", (event) => {
        playerEndChoice.textContent = event.target.textContent;
    });
});

playButton.addEventListener("click", (event) => {
    playRound();
});

function setComputerChoice(computerChoice){
    computerEndChoice.textContent = computerChoice;
    computerEndChoice.style.color = "white";
}

function getRandomInt(end){
    return Math.floor(Math.random()*end);
}

function generateComputerChoice(){
// Get a random number between 0 and 3 (exclusivly)
    let computerChoice = getRandomInt(3);
// Map it to the availabe choices
    switch(computerChoice){
        case 0:
            computerChoice = possibleChoices.Rock;
            break;
        case 1:
            computerChoice = possibleChoices.Paper;
            break;
        case 2:
            computerChoice = possibleChoices.Scissors;
            break;
        default:
            console.error("Invalid Random number!");
    }
    return computerChoice;
}

function getHumanChoice(){
    return playerEndChoice.textContent;
}

function checkForUserWin(humanChoice, computerChoice){
    if(humanChoice === computerChoice){
        return possibleOutcomes.Draw;
    }else if((humanChoice === possibleChoices.Rock && computerChoice === possibleChoices.Scissors) ||
             (humanChoice === possibleChoices.Paper && computerChoice === possibleChoices.Rock) ||
             (humanChoice === possibleChoices.Scissors && computerChoice === possibleChoices.Paper)){
        return possibleOutcomes.PlayerWin;
    }
    return possibleOutcomes.PlayerLose;
}

function playRound(){
    let computerChoice = generateComputerChoice();
    setComputerChoice(computerChoice);
    let outcome = checkForUserWin(getHumanChoice(), computerChoice);
    updateScore(outcome);
    updateScoreBoard();
    currentRound++;
    updateRoundTracker();
    checkForEndOfGame();
}

function checkForEndOfGame(){
    if(humanScore >= winScore || computerScore >= winScore) {
        setTimeout(function () {
            alert(humanScore >= winScore ? "You won! Let's play again!" : "You lost! Don't give up, try again!");
            currentRound = 1;
            humanScore = 0;
            computerScore = 0;
            updateScoreBoard();
            updateRoundTracker();
            computerEndChoice.style.color = "transparent";
        }, 1);
    }
}

function updateScore(outcome){
    humanScore += outcome[0];
    computerScore += outcome[1];
}

function updateScoreBoard(){
    playerScoreElement.textContent = humanScore;
    computerScoreElement.textContent = computerScore;
}

function updateRoundTracker(){
    roundTracker.textContent = "Round " + currentRound;
}