let timer = document.querySelector("#time")//timer is "time" on the game screen

let second = 0 //begin timer count at 0
let minute = 0 

//creating a timer
const startTime =()=>{
    second+=1
    if(second >= 60){
        minute +=1
        second = 0      
    }
    let secondsOutput = second < 10 ? `0${second}`:second //if seconds value is less than 10 -> show 0 before the interger
    let minutesOutput = minute < 10 ? `0${minute}`:minute 
    let outputTimer = `${minutesOutput}:${secondsOutput}` //"time" output as shown on the screen

    timer.innerHTML = outputTimer
}
startTime()

let beginCount = setInterval(startTime, 1000)

// adding a flip effect
let cards = document.querySelectorAll(".card") //select all cards

function flippedCard(){ 
    this.classList.toggle("flip") //add flip to all cards
}
cards.forEach(a => {
    a.addEventListener("click", flippedCard) //trigger flip with a click
})



