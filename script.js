
const questionText = document.querySelector('.question-Text');
const optionBox = document.querySelector('.option-box');
const questionIndex = 0;

// questions and options and answer and answer description 
// array of object
myApp = [
    {
        question: "Ile kcal ma 10 gramów białka",
        options: ["1", "10", "40", "100"],
        answer:2,
        description:''
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

function load(){
    questionText.innerHTML=myApp[questionIndex].question;
    createOptions();
}

function createOptions(){
    for (let i=0; i<myApp[questionIndex].options.length; i++) {
        const option = document.createElement('div');
        option.innerHTML=myApp[questionIndex].options[i];
        option.classList.add('option');
        option.id = i;
        option.setAttribute('onclick', 'check(this)')
        optionBox.appendChild(option);
    }
}

function check(ele) {
    const id = ele.id;
    if(id==myApp[questionIndex].answer) {
        ele.classList.add('correct');
    } else {
        ele.classList.add('wrong');
    }

    disableOptions()
}

function disableOptions(){
    for(let i=0; i<optionBox.children.length; i++) {
        optionBox.children[i].classList.add("already-answered")
    }
}

window.onload=()=> {
    load();
}