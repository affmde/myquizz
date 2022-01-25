import { questionary } from './questions'

const question = document.querySelector("#question");
const options = Array.from(document.querySelectorAll('.choice-text'));
const points= document.querySelector("#points");
const progress= document.querySelector(".progressText");
const time= document.querySelector(".time-left")



let currentQuestion= {};
let acceptingAnswers = true;
let score= 0;
let questionCounter= 0;
let availableQuestions= [];
let timerCount= 120;

let bonus= 0;
let correctAnswer=0;
let wrongAnswer= 0;

const SCORE_POINTS = 20;

    

const startGame = ()=>{
    score=0;
    timerCount=60;
    questionCounter= 0;
    availableQuestions = [...questionary]
    setInterval(quizTimer ,1000)
    
    getNewQuestion();
    console.log(availableQuestions.length)
}

const quizTimer = () =>{
        timerCount--
        console.log(timerCount)
        time.innerText=timerCount
        if(timerCount===0){
            localStorage.setItem('mostRecentScore', score);
            localStorage.setItem('numbOfCorrectAnswers', correctAnswer);
            localStorage.setItem('numbOfIncorrectAnswers', wrongAnswer);
            return window.location.assign('/end.html');  
        }
}



const  getNewQuestion = ()=>{
    if(availableQuestions.length === 0){
        localStorage.setItem('mostRecentScore', score);
        localStorage.setItem('numbOfCorrectAnswers', correctAnswer);
        localStorage.setItem('numbOfIncorrectAnswers', wrongAnswer);
        return window.location.assign('/end.html');
    }

    questionCounter++;
    progress.innerText= `Question: ${questionCounter}`;

    const questionIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex];
    question.innerText= currentQuestion.question;

    options.forEach(option =>{
        const number = option.dataset['number'];
        option.innerText= currentQuestion['choice' + number]
    }) 

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers= true;
};

options.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers= false;
        const selectedOption = e.target;
        const selectedAnswer = selectedOption.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
    
        
        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS);
            bonus++
            console.log(bonus)
            correctAnswer++
            
        }else{
            bonus=0;
            wrongAnswer++
            
        }

        selectedOption.parentElement.classList.add(classToApply);

        setTimeout(()=>{
            selectedOption.parentElement.classList.remove(classToApply)
            getNewQuestion();
        }, 1000)
        

    })

})


const incrementScore =(num)=>{   
    if(bonus>5){
        score = score+(num*1.75)
    points.innerText= score
        
    }else if(bonus>2 && bonus<=5){       
        score = score+(num*1.25)
    points.innerText= score
    }else{
        score +=num
    points.innerText= score
    }

}


startGame()
