
document.querySelector("section").classList.toggle("hide")
let timer = document.querySelector("#time") //timer is "time" on the game screen

const startButton = document.querySelector("#start-button")
startButton.addEventListener("click", function(){
    startGame()
    setNames()
  
})

function startGame(){
    document.querySelector(".landing-page").classList.toggle("hide")
    document.querySelector("section").classList.toggle("hide")
    startTime()
}

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
}
let beginCount = setInterval(startTime, 1000)



// adding a flip effect
let cards = document.querySelectorAll(".card") //select all cards

let card1 //cards from each pair that will be flipped
let card2
let cardIsFlipped = false //cards are not flipped on default, and are facing backwards
let cardIsLocked = false

function flippedCard() {
    if(cardIsLocked) {
        return
    }else if (this === card1){ //if the same card has been clicked twice
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
        lockTheCards()
        return true
    } else {
        flipBack() //if datasets of the cards are different - call this func to flip cards back
    }
}

function lockTheCards() { //lock the cards that have matched, so they don't flip back
    card1.removeEventListener("click", flippedCard)
    card2.removeEventListener("click", flippedCard)

    reverseTheBoard()
}
//flip the cards back if they don't match in 1 sec
function flipBack() {
    setTimeout(() => {
        card1.classList.remove("flip")
        card2.classList.remove("flip")
        reverseTheBoard()
    }, 1000)
}

cards.forEach(el => { //a loop that runs through all cards from the ".card" classlist
    el.addEventListener("click", flippedCard) //trigger flip with once clicked
})

function reverseTheBoard(){ //reverse the cards to their starting position
    cardIsLocked = false
    cardIsFlipped = false
    card1 = null
    card2 = null
}

function shuffle(){ //shuffle the board
    cards.forEach(el =>{
        let shuffled = Math.floor(Math.random() * 10)
        el.style.order = shuffled
    })
}

//function to print names on the screen
function setNames(){

 let inputName1 = document.querySelector("#player1").value
 let outputName1 = document.querySelector("#name1")
 let inputName2 = document.querySelector("#player2").value
 let outputName2 = document.querySelector("#name2")

// if input will be empty, set players name
 if (inputName1 == "" || inputName2 == "") {
    inputName1 = "Player1"
    inputName2 = "Player2"
 }

outputName1.innerHTML = inputName1
outputName2.innerHTML = inputName2
}

// const player2 = document.querySelector("#player2").value





