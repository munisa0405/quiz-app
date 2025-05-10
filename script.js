const questions= [
    {
        question: "What does HTML stand for?",
        answer: [
            { text: "Hyper Trainer Marking Language",correct: false},
            { text: "HyperText Markup Language",correct: true},
            { text: "HighText Machine Language",correct: false},
            { text: "HyperTool Multi Language",correct: false},
        ]
    },
    {
        question: "Which tag is used to link an HTML document?",
        answer: [
            { text: "script",correct: false},
            { text: "css",correct: false},
            { text: "link",correct: true},
            { text: "style",correct: false},
        ]
    },
    {
        question: "What is CSS for?",
        answer: [
            { text: "To give style to a web page",correct: true},
            { text: " To send emails",correct: false},
            { text: "To draw pictures",correct: false},
            { text: "To create tables",correct: false},
        ]
    },
    {
        question: "What is HTML used for?",
        answer: [
            { text: " To make web pages",correct: true},
            { text: " To play music",correct: false},
            { text: "To write books",correct: false},
            { text: "To watch videos",correct: false},
        ]
    },
];


const questionElement= document.getElementById("question");
const answerButtons= document.getElementById("answer-buttons");
const nextButton= document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score =0;

function startQuiz() {
    currentQuestionIndex= 0;
    score= 0;
    nextButton.innerHTML= "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let QuestionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = QuestionNo + ". "+ currentQuestion.question;



currentQuestion.answer.forEach(answer => {
    const button= document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct= answer.correct;
    }
    button.addEventListener("click", selectAnswer);
});
}


function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true") {
            button.classList.add("correct");
        }
        button.disabled= true;

});
nextButton.style.display="block";


}




function showScore() {
    resetState();
    // Your score va umumiy savollar soni
    questionElement.innerHTML = `Your score: ${score} out of ${questions.length}!`;

    // Har bir savol va uning to‘g‘ri javobini ko‘rsatish
    questions.forEach((question, index) => {
        const questionText = question.question;
        const correctAnswer = question.answer.find(answer => answer.correct).text;

        // Savol va to‘g‘ri javobni ko‘rsatish
        const resultElement = document.createElement("div");
        resultElement.classList.add("result");
        resultElement.innerHTML = `
            Question ${index + 1}: ${questionText}<br>
            Correct Answer: ${correctAnswer}<br>
        `;
        questionElement.appendChild(resultElement);
    });

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}



function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    
}else{
    showScore();
}
}



nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }    else{
        startQuiz();
    
    }
});
startQuiz();
