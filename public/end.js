const username = document.querySelector('#username');
const saveScoreButton = document.querySelector('#saveButton');
const playAgain = document.querySelector('#playAgain');
const finalScore = document.querySelector('.final-points');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const incorrectAnswer = localStorage.getItem('numbOfIncorrectAnswers');
const correctAnswers = localStorage.getItem('numbOfCorrectAnswers');
const corrAnsw = document.querySelector("#number-of-correct-answers");
const incAnsw = document.querySelector("#number-of-incorrect-answers")

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGH_SCORES = 10;

finalScore.innerText= mostRecentScore;
corrAnsw.innerText= correctAnswers;
incAnsw.innerText= incorrectAnswer;



username.addEventListener('keyup', ()=>{
    saveScoreButton.disabled = !username.value;
})

const saveHighScore = e=>{
    e.preventDefault()

    const score={
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('home.html')
}
