const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const resultsContainer = document.getElementById("results");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startBtn.classList.add("hide");
    nextBtn.classList.add("hide");
    questionContainer.classList.remove("hide");
    resultsContainer.classList.add("hide");
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    nextBtn.classList.add("hide");
}

function selectAnswer(e) {
    Array.from(answerButtonsElement.children).forEach((btn) =>
        btn.classList.remove("selected")
    );

    const selectedButton = e.target;
    selectedButton.classList.add("selected");

    const correct = selectedButton.dataset.correct;

    if (correct) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtonsElement.children).forEach((button) => {
        if (button.dataset.correct) {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    if (currentQuestionIndex < questions.length - 1) {
        nextBtn.classList.remove("hide");
    } else {
        showResults();
    }
}

function showResults() {
    questionContainer.classList.add("hide");
    resultsContainer.classList.remove("hide");
    scoreElement.innerText = `Score: ${score}/${questions.length}`;
    nextBtn.classList.add("hide");
    startBtn.innerText = "Spill på nytt";
    startBtn.classList.remove("hide");
}

function handleNextButton() {
    currentQuestionIndex++;
    showQuestion();
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", handleNextButton);

startBtn.classList.remove("hide");
nextBtn.classList.add("hide");
resultsContainer.classList.add("hide");
