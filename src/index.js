import Hangman from './hangman'
import getPuzzle from './requests'


const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guesses')
const quitButton = document.querySelector('#quit')
const resetButton = document.querySelector('#reset')
const wrongLetters = document.querySelector('#wrongLetters')
let game1

window.addEventListener('keypress', (e) => {
    const guess = String.fromCharCode(e.charCode)
    game1.makeGuess(guess)
    render()
})

// function removeQuit() {
//     quitButton.parentNode.removeChild(quitButton);
//     resetButton.classList.add('endgame')
//     return false;
// }

const render = () => {
    puzzleEl.innerHTML = ' '
    guessesEl.textContent = game1.statusMessage
    wrongLetters.textContent = `Incorrect Letters: ${game1.incorrectLetters.join(' ')}`
    if (game1.status === 'playing') {
        game1.puzzle.split('').forEach((letter) => {
            const letterEl = document.createElement('span')
            letterEl.textContent = letter
            puzzleEl.appendChild(letterEl)
            quitButton.disabled = false
        })
        quitButton.id = 'quit'
        resetButton.id = 'reset'
    } else if (game1.status === 'failed') {
        game1.word.forEach((letter) => {
            const letterEl = document.createElement('span')
            letterEl.textContent = letter
            letterEl.style.color = 'red'
            puzzleEl.appendChild(letterEl)
            quitButton.disabled = true
        })
        quitButton.id = 'endgameQ'
        resetButton.id = 'endgameR'
    } else {
        game1.word.forEach((letter) => {
            const letterEl = document.createElement('span')
            letterEl.textContent = letter
            // letterEl.style.color = 'red'
            puzzleEl.appendChild(letterEl)
            quitButton.disabled = true
        })
        quitButton.id = 'endgameQ'
        resetButton.id = 'endgameR'
    }
}

const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) ) + min;

const startGame = async () => {
    const wordNum = getRndInteger(1,3)
    const puzzle = await getPuzzle(wordNum.toString())
    game1 = new Hangman(puzzle, 5)
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)



quitButton.addEventListener('click', () => {
    if (game1.status = 'failed' && game1.status != 'finished') {
        game1.status = 'failed'
       render() 
    } 
    
})

startGame()



