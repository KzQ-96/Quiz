myApp = [
    {
        question: "Ile kcal ma 10 gramów białka",
        options: ["1", "10", "40", "100"],
        answer:2,
    },
    {
        question: "Sen nie wpływa na proces redukcji",
        options: ["prawda", "fałsz"],
        answer:1,
        description:'Wiele osób spi po 8h'
    },
    {
        question: "Triceps posiada ...",
        options: ["1 głowe", "2 głowy", "3 głowy", "4 głowy"],
        answer:2,
    },
    {
        question: "Można tyć nic nie jedząc",
        options: ["prawda", "fałsz",],
        answer:1,
        description:'Na prawde nie można'
    },
    {
        question: "Czym jest kreatyna",
        options: ["suplementem", "sterydem", "kwasem tłuszczowym", "hormonem"],
        answer:0,
    }

]

const questionText = document.querySelector('.question-Text');
const correctQuestionNum = document.querySelector('.current-question-num');
const correctAnswers = document.querySelector(".correct-answers");
const optionBox = document.querySelector('.option-box');
const answerDescription = document.querySelector('.answer-description');
const nextQuestionBtn = document.querySelector('.next-question-btn');
const seeResultBtn = document.querySelector('.see-result-btn');
const remaningTime = document.querySelector('.remaining-time');
let number = 0;
let questionIndex = 0;
let score = 0;
let myArray= [];
let interval;

function generateRandomQuestion(){
    const randomNum = Math.floor(Math.random() * myApp.length);
    let scoreDublicate = 0;
     if (myArray.length == 0) {
        questionIndex = randomNum;
     }
     else {
         for (let i=0; i < myArray.length; i++ ){
             if (randomNum == myArray[i]){
                 scoreDublicate = 1;
             }
            }
             if (scoreDublicate == 1) {
                 generateRandomQuestion();
                 return;
             } else {
                 questionIndex = randomNum;
             }
     }
     myArray.push(randomNum)
     load();
}

function load(){
    number++;
    questionText.innerHTML=myApp[questionIndex].question;
    correctQuestionNum.innerHTML=`${number} / ${myApp.length}`;
    scoreBoard();
    createOptions();
}

function createOptions(){
    optionBox.innerHTML="";
    let animationDelay=0.2;
    for (let i=0; i < myApp[questionIndex].options.length; i++){
        const option = document.createElement('div');
        option.innerHTML=myApp[questionIndex].options[i];
        option.classList.add('option');
        option.id=i;
        animationDelay = animationDelay+0.2;
        option.style.animationDelay=animationDelay + 's';
        option.setAttribute('onclick', 'check(this)')
        optionBox.appendChild(option);
    }
}

function check (e) {
    const id = e.id;
    if (id == myApp[questionIndex].answer){
        e.classList.add('correct')
        score++;
        scoreBoard();
    } else {
        e.classList.add('wrong')
        for (i=0; i < optionBox.children.length; i++) {
            if (optionBox.children[i].id==myApp[questionIndex].answer){
                optionBox.children[i].classList.add('show-correct');
            }
        }
    }
    disableOptions();
    showAnswerDescription();
    showNextQuestionBtn();
    stopTimer();

    if (number == myApp.length){
        quizOver();
    }
}

function startTimer(){
    let timeLimit = 15;
    remaningTime.innerHTML=timeLimit;
        interval=setInterval(()=>{
        timeLimit--;
        if(timeLimit < 10){
            timeLimit="0"+timeLimit;
        }
        if(timeLimit <6){
            remaningTime.classList.add('less-time');
        }
        remaningTime.innerHTML=timeLimit;
        if(timeLimit == 0) {
            clearInterval(interval);
        }
    }, 1000)
}

function stopTimer(){
    clearInterval(interval);
}

function scoreBoard(){
    correctAnswers.innerHTML=score;
}

function disableOptions(){
    for (i=0; i < optionBox.children.length; i++){
        optionBox.children[i].classList.add('already-answered');
    }
}

function showAnswerDescription(){
    if(typeof myApp[questionIndex].description !== 'undefined') {
        answerDescription.classList.add('show');
        answerDescription.innerHTML=myApp[questionIndex].description;
    }
}

function hideAnswerDescription(){
        answerDescription.classList.remove('show');
}

function showNextQuestionBtn(){
    nextQuestionBtn.classList.add('show');
}
function hideNextQuestionBtn(){
    nextQuestionBtn.classList.remove('show');
}

nextQuestionBtn.addEventListener('click', nextQuestion);

function nextQuestion(){
    // questionIndex++;
    // load();
    generateRandomQuestion();
    hideNextQuestionBtn();
    hideAnswerDescription();
}

function quizOver(){
    nextQuestionBtn.classList.remove('show');
    seeResultBtn.classList.add('show');

}

window.onload=()=> {
    // load();
    generateRandomQuestion();
    startTimer();
}