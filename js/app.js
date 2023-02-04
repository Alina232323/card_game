document.querySelector("section").classList.toggle("hide", true)
document.querySelector(".end-game-page").classList.toggle("hide", true)

const endGameButton = document.querySelector("#end-game-button")
endGameButton.addEventListener("click", function() {
    endGame()
})

const startButton = document.querySelector("#start-button")
startButton.addEventListener("click", function() {
    startGame()
    setNames()
    shuffle()
    beginCount = setInterval(startTime, 1000) //fires up the timer
})
let timer = document.querySelector("#time") //timer is "time" on the game screen
let beginCount

let second = 0 //begin timer count at 0
let minute = 0

//creating a timer
const startTime = () => {

    second += 1
    if (second >= 60) {
        minute += 1
        second = 0
    }
    let secondsOutput = second < 10 ? `0${second}` : second //if seconds value is less than 10 -> show 0 before the interger
    let minutesOutput = minute < 10 ? `0${minute}` : minute
    let outputTimer = `${minutesOutput}:${secondsOutput}` //"time" output as shown on the screen

    timer.innerHTML = outputTimer
    if (minutesOutput >= 2) {
        clearInterval(beginCount)
        // endGame()
    }

}

let inputName1
let inputName2
let outputName1
let outputName2
let playerOneName
let playerTwoName
let playerTurn = document.querySelector("#current-player")
let player1Score = document.querySelector("#score1")
let player2Score = document.querySelector("#score2")
let currentPlayerScore

//function to print names on the screen
function setNames() {

    inputName1 = document.querySelector("#player1").value
    outputName1 = document.querySelector("#name1")
    inputName2 = document.querySelector("#player2").value
    outputName2 = document.querySelector("#name2")

    // if input is empty, set players name
    if (inputName1 == "" || inputName2 == "") {
        inputName1 = "Player1"
        inputName2 = "Player2"
    }

    outputName1.innerHTML = inputName1
    outputName2.innerHTML = inputName2
    playerOneName = inputName1
    player1Score.innerHTML = 0
    playerTwoName = inputName2
    player2Score.innerHTML = 0
    playerTurn.innerHTML = playerOneName

}
//function to switch turns for players if cards haven't matched  
function switchPlayer() {
    if (playerTurn.innerHTML === playerOneName) {
        playerTurn.innerHTML = playerTwoName
        currentPlayerScore = player2Score.innerHTML
        return
    } else {
        playerTurn.innerHTML = playerOneName
        currentPlayerScore = player1Score.innerHTML
    }
}

function startGame() {
    document.querySelector(".landing-page").classList.toggle("hide", true)
    document.querySelector("section").classList.toggle("hide", false)
    startTime()
}

// adding a flip effect
let cards = document.querySelectorAll(".card") //select all cards

let card1 //cards from each pair that will be flipped
let card2
let cardIsFlipped = false //cards are not flipped on default, and are facing backwards
let cardIsLocked = false //if true 2 cards have been flipped and are to be checked for a match

function flipTheCard() {
    if (cardIsLocked) {
        return
    } else if (this === card1) { //if the same card has been clicked twice
        return
    }

    this.classList.add("flip") //add flip to all cards

    if (!cardIsFlipped) { //if card is flipped
        cardIsFlipped = true
        card1 = this //add this card  to the classlist
        return
    }
    card2 = this
    isAMatch() //call isAMatch func to check if the cards matched
}

function isAMatch() {
    if (card1.dataset.id === card2.dataset.id) { //if datasets of these cards are the same - the cards have matched

        if (playerTurn.innerHTML === playerOneName) {
            player1Score.innerHTML++
        } else if (playerTurn.innerHTML === playerTwoName) {
            player2Score.innerHTML++
        }
        lockTheCards()
        ifAllCardsGuessed()
        return true
    } else {
        flipBack() //if datasets of the cards are different - call this func to flip cards back
    }
}

let matchedCards = document.getElementsByClassName("card flip")

function ifAllCardsGuessed(){
if(matchedCards.length >= 20){
    endGame()
}else{
}return
}


function lockTheCards() { //lock the cards that have matched, so they don't flip back
    card1.removeEventListener("click", flipTheCard)
    card2.removeEventListener("click", flipTheCard)
    clearCardValues()
}
//flip the cards back if they don't match 
function flipBack() {
    setTimeout(() => {
        card1.classList.remove("flip")
        card2.classList.remove("flip")
        clearCardValues()
        switchPlayer()
    }, 1000)
}

cards.forEach(el => { //a loop that runs through all cards from the ".card" classlist
    el.addEventListener("click", flipTheCard) //trigger flip with once clicked
})

function clearCardValues() { //empty cards' values
    cardIsLocked = false
    cardIsFlipped = false
    card1 = null
    card2 = null
}

function shuffle() { //shuffle the board
    cards.forEach(el => {
        let shuffled = Math.floor(Math.random() * 10)
        el.style.order = shuffled
        player1Score.innerHTML = 0
        player2Score.innerHTML = 0
    })
   
}

const restartButton = document.querySelector("#restart-button")
restartButton.addEventListener("click", function() {
    clearCardValues()
    shuffle()
})

let endGameMessage = document.querySelector("#end-game-message")

function endGame() {

    document.querySelector("section").classList.toggle("hide", true)
    document.querySelector(".landing-page").classList.toggle("hide", true)
    document.querySelector(".end-game-page").classList.toggle("hide", false)
    
    if (player1Score.innerHTML > player2Score.innerHTML) {
        endGameMessage.innerHTML = "Congratulations, the challenge is over!" + "<br>" + playerOneName + " is a winner!"
    } else if (player1Score.innerHTML < player2Score.innerHTML) {
        endGameMessage.innerHTML = "Congratulations, the challenge is over!" + "<br>" + playerTwoName + " is a winner!"
    } else if (player1Score.innerHTML = player2Score.innerHTML && player1Score.innerHTML + player2Score.innerHTML != 0) {
        endGameMessage.innerHTML = "Congratulations, the challenge is over! It's a draw!"
    } else
        endGameMessage.innerHTML = "Oops, no winners at this time! Try again!"
    return
}