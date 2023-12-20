const questions = [
    {
        question: " What does HTML stand for?",
        answers: [
            { Text: "Highly Textual Markup Language.", correct: false},
            { Text: "Hypertext Markup Language.", correct: true},
            { Text: "Highly Textual Markup Language.", correct: false},
            { Text: "Hyper Text Multi Language.", correct: false},
            { Text: "Hypertext Model Language.", correct: false},
        ]
    },

    {
        question: " What is the main purpose of CSS?",
        answers: [
            { Text: "To create animations.", correct: false},
            { Text: "To manage database queries.", correct: false},
            { Text: "For server-side scripting.", correct: false},
            { Text: "To define the structure of a web page.", correct: false},
            { Text: "To style and format the content of a web page.", correct: true},
        ]  
    },

    {
        question: " Which programming language is primarily used for web development?",
        answers: [
            { Text: "JavaScript", correct: true},
            { Text: "C++", correct: false},
            { Text: "Ruby", correct: false},
            { Text: "PHP", correct: false},
            { Text: "HTML", correct: false},
        ] 
    },

    {
        question: " Explain the role of JavaScript in web development.",
        answers: [
            { Text: "To design the layout of a webpage.", correct: false},
            { Text: "To define the styling and colors of a webpage.", correct: false},
            { Text: "To handle server-side operations.", correct: false},
            { Text: "To add interactivity and dynamic behavior to websites.", correct: true},
            { Text: "To manage databases.", correct: false},
        ]   
    },

    {
        question: " What is the difference between margin and padding in CSS?",
        answers: [
            { Text: "Margin is the space between elements.", correct: false},
            { Text: "Padding is the space around the content.", correct: false},
            { Text: "Margin is the space outside the border of an element, while padding is the space between the content and border.", correct: true},
            { Text: "Margin is the inner spacing of an element.", correct: false},
            { Text: "Both margin and padding are used interchangeably.", correct: false},
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();

    }else{
        startQuiz();
    }
})

startQuiz();

