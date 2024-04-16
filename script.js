let randomNumber = parseInt(Math.random()*10+1)

const userInput = document.querySelector('#guessField')
const submit = document.querySelector('#subt')
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const startOver = document.querySelector('.resultParas')
const lowOrHi = document.querySelector('.lowOrHi')

const p = document.createElement('p')

let prevGuesses = []
let numOfGuesses = 1

let playGame = true

if(playGame) {
    submit.addEventListener('click', (e)=>{
        e.preventDefault()
        const guess = parseInt(userInput.value)
        validateGuess(guess)
    })
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please enter a valid number')
    }
    else if (guess < 1) {
        alert('Please enter a number greater than 1')
    }
    else if(guess >10) {
        alert('Please enter a number less than or equal to 10')
    }
    else {
        prevGuesses.push(guess)
        if(numOfGuesses > 10) {
            cleanupGuess(guess)
            displayMessage(`Game Over ! Random number was ${randomNumber}`,`color: red`)
            endGame()
        }
        else {
            cleanupGuess(guess) 
            checkGuess(guess)
        }
    }
}

function checkGuess(guess) {
    if(guess === randomNumber) {
        displayMessage(`You guessed it right`,`color: green`)
        endGame()
    }
    else if (guess < randomNumber) {
        displayMessage(`Number is too low`,`color: white`)
    }
    else {
        displayMessage(`Number is too high`,`color: white`)
    }
}

function cleanupGuess(guess) {
    userInput.value = ''
    if (numOfGuesses < 11) {
        guessSlot.innerHTML += `${guess} `
    }
    // guessSlot.innerHTML += `${guess}`
    numOfGuesses++
    if (numOfGuesses <= 11) {
        remaining.innerHTML = (parseInt(remaining.innerHTML)) - 1
    }
    // remaining.innerHTML = (parseInt(remaining.innerHTML)) - 1
}

function displayMessage(message,style) {
    lowOrHi.innerHTML = `<h2 style="${style}">${message}</h2>`
}

function endGame() {
    userInput.value = ''
    userInput.setAttribute('disabled','')
    p.classList.add('button')
    p.innerHTML = '<h2 id="newGame">Start a new game</h2>'
    startOver.appendChild(p)
    playGame = false
    newGame()
}

function newGame(guess) {
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click', (e)=>{
        randomNumber = parseInt(Math.random()*10+1)
        prevGuesses = []
        numOfGuesses = 1
        guessSlot.innerHTML = ''
        // remaining.innerHTML = (parseInt(remaining.innerHTML)) - 1
        remaining.innerHTML = 11 - 1
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        playGame = true
        displayMessage('')
    })
}