
const questionText = document.querySelector('.question-Text');
const optionBox = document.querySelector('.option-box');
const currentQuestionNum=document.querySelector('.current-question-num');
const answerDescription=document.querySelector('.answer-description');
const nextQuestionBtn=document.querySelector('.next-question-btn');
const correctAnswer=document.querySelector('.correct-answers');
const seeResultBtn=document.querySelector('.see-result-btn');
const remainingTime=document.querySelector('.remaining-time');
const timeUpText=document.querySelector('.time-up-text');
const quizHomeBox=document.querySelector('.quiz-home-box');
const quizBox=document.querySelector('.quiz-box');
const quizOverBox=document.querySelector('.quiz-over-box');
let attempt = 0;
let questionIndex = 0;
let score = 0;
let number = 0;
let myArray=[];
let interval;

// questions and options and answer and answer description 
// array of object
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
// tworzenie ptania
function load(){
    number++;
    questionText.innerHTML=myApp[questionIndex].question;
    createOptions();
    scoreBoard();
    currentQuestionNum.innerHTML=number + " / " + myApp.length;
}
// tworzenie odpowiedzi
function createOptions(){
    optionBox.innerHTML="";
    let animationDealy=0.2;
    for (let i=0; i<myApp[questionIndex].options.length; i++) {
        const option = document.createElement('div');
        option.innerHTML=myApp[questionIndex].options[i];
        option.classList.add('option');
        option.id = i;
        animationDealy=animationDealy+0.2;
        option.style.animationDelay=animationDealy + 's';
        option.setAttribute('onclick', 'check(this)')
        optionBox.appendChild(option);
    }
}
// funkcja odpowiedzi wywołana kliknieciem
function check(ele) {
    const id = ele.id;
    if(id==myApp[questionIndex].answer) {
        ele.classList.add('correct');
        score++;
        scoreBoard();
    } else {
        ele.classList.add('wrong');
        for(let i=0; i<optionBox.children.length; i++){
            if(optionBox.children[i].id==myApp[questionIndex].answer){
                optionBox.children[i].classList.add("show-correct");
            }
        }
    }
    attempt++;
    disableOptions();
    showAnswerDescription();
    showNextQuestionBtn();
    stopTimer();

      if(number == myApp.length){
        quizOver();
    }
}

function generateRandomQuestion(){
    const randomNumber=Math.floor(Math.random() * myApp.length);
    let hitDublicate=0;
    if(myArray.length == 0){
        questionIndex=randomNumber;
    }
    else {
        for(let i=0; i<myArray.length; i++){
            if(randomNumber == myArray[i]) {
                hitDublicate=1;
            }
        }
        if(hitDublicate == 1){
            generateRandomQuestion();
            return;
        }
        else {
            questionIndex=randomNumber;
        }
    }
    myArray.push(randomNumber);
    load();
}
function timeIsUp(){
    showTimeUpText();
    for(let i=0; i<optionBox.children.length; i++){
        if(optionBox.children[i].id==myApp[questionIndex].answer){
            optionBox.children[i].classList.add("show-correct");
        }
    }
    disableOptions();
    showAnswerDescription();
    showNextQuestionBtn();
    if(number == myApp.length){
        quizOver();
      }
}

function startTimer(){
    remainingTime.classList.remove('less-time');
    let timeLimit=15;
    remainingTime.innerHTML=timeLimit;
    interval=setInterval(()=>{
        timeLimit--;
        if(timeLimit < 10){
            timeLimit="0"+timeLimit;
        }
        if(timeLimit <6){
            remainingTime.classList.add('less-time');
        }
        remainingTime.innerHTML=timeLimit;
        if(timeLimit == 0) {
            clearInterval(interval);
            timeIsUp();
        }
    }, 1000)
}

function stopTimer(){
    clearInterval(interval);
}
// zablokowanie dalszego wybierania odpowiedzi
function disableOptions(){
    for(let i=0; i<optionBox.children.length; i++) {
        optionBox.children[i].classList.add("already-answered")
    }
}
// wywołanie opisu jeżeli jest zawarty
function showAnswerDescription() {
    if(typeof myApp[questionIndex].description !== 'undefined') {
    answerDescription.classList.add('show');
    answerDescription.innerHTML=myApp[questionIndex].description;
    }
}

function hideAnswerDescription() {
    answerDescription.classList.remove('show');
    answerDescription.innerHTML="";
}
// wywołanie przycisku nastepne pytanie
function showNextQuestionBtn() {
    nextQuestionBtn.classList.add('show');
}

function hideNextQuestionBtn() {
    nextQuestionBtn.classList.remove('show');
}

function showTimeUpText() {
    timeUpText.classList.add('show');
}

function hideTimeUpText() {
    timeUpText.classList.remove('show');
}

// wywołania wyniku
function scoreBoard() {
    correctAnswer.innerHTML=score;
}
// wywołanie następne pytanie
nextQuestionBtn.addEventListener('click', nextQuestion);

function nextQuestion(){
    generateRandomQuestion();
    hideNextQuestionBtn();
    hideAnswerDescription();
    hideTimeUpText();
    startTimer();
}

function quizResult(){
    document.querySelector('.total-questions').innerHTML=myApp.length;
    document.querySelector('.total-attempt').innerHTML=attempt;
    document.querySelector('.total-correct').innerHTML=score;
    document.querySelector('.total-wrong').innerHTML=attempt-score;
    document.querySelector('.percentage').innerHTML=(score / myApp.length * 100 + '%');
}

function quizOver(){
    nextQuestionBtn.classList.remove("show");
    seeResultBtn.classList.add("show");
}

seeResultBtn.addEventListener('click', ()=> {
    quizOverBox.classList.add('show');
    seeResultBtn.classList.remove('show');
    quizBox.style.display='none';
    quizResult();
})

window.onload=()=> {
    // load();
    generateRandomQuestion();
    startTimer();
}