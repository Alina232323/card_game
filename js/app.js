let timer = document.querySelector("#time") //timer is "time" on the game screen

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
startTime()

let beginCount = setInterval(startTime, 1000)

// adding a flip effect
let cards = document.querySelectorAll(".card") //select all cards

let card1 //cards from each pair that will be flipped
let card2
let cardIsFlipped = false //cards are not flipped on default, and are facing backwards

function flippedCard() {
    this.classList.add("flip") //add flip to all cards

    if (!cardIsFlipped) { //if card is flipped
        cardIsFlipped = true
        card1 = this //add this card  to the classlist
        return
    }

    cardIsFlipped = false
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
}
//flip the cards back if they don't match in 1 sec
function flipBack() {
    setTimeout(() => {
        card1.classList.remove("flip")
        card2.classList.remove("flip")
    }, 1000)
}

cards.forEach(el => {
    el.addEventListener("click", flippedCard) //trigger flip with once clicked
})


