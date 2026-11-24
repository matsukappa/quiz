
let questions = [];
async function loadQuestions() {
  const response = await fetch("questions.json");
  const allQuestions = await response.json();

  //カテゴリを取得
  const selectedCategory = localStorage.getItem("category");
  //カテゴリ絞り込み
  questions = allQuestions.filter(
    q => q.category === selectedCategory
  );

  showQuestions();
}

let currentQuestion = 0;
let score = 0;

const selectedCategory = localStorage.getItem("category");
const wordElement = document.getElementById("quest");
const choicesElement = document.getElementById("choices");
const resultElement = document.getElementById("result");
const explanationElement = document.getElementById("explanation");
const nextBtn = document.getElementById("nextBtn");
const questionCountElement = document.getElementById("question-count");
//const category = localStorage.getItem("category");

function showQuestions() {

    const q = questions[currentQuestion];

    questionCountElement.textContent =
        `${currentQuestion + 1} / ${questions.length}`;

    wordElement.textContent = q.quest;

    //GAタグ
    gtag('event', 'view_question', {
        category: selectedCategory,
        question_no: currentQuestion + 1,
        total_questions: questions.length
    });

    choicesElement.innerHTML = "";
    resultElement.textContent = "";

    const shuffledChoices = [...q.choices].sort(() => Math.random()-0.5)

    shuffledChoices.forEach(choice => {
        const button = document.createElement("button");

        button.textContent = choice;
        button.className = "choice-btn";

        button.addEventListener("click", function () {
            checkAnswer(choice);
        });

        choicesElement.appendChild(button);
    });

    nextBtn.style.display = "none";
}

function checkAnswer(choice) {

    const q = questions[currentQuestion];

    if (choice === q.correct) {
        //GAタグ
        gtag('event', 'answer_question', {
            category: selectedCategory,
            question_no: currentQuestion + 1,
            question_id: q.id,
            result: 'correct'
        });
        resultElement.textContent = "⭕ 正解！";
        resultElement.style.color = "green";
        score++;
    } else {
        //GAタグ
        gtag('event', 'answer_question', {
            category: selectedCategory,
            question_no: currentQuestion + 1,
            result: 'wrong'
        });
        resultElement.textContent =
            `❌ 正解は「${q.correct}」`;
        resultElement.style.color = "red";
    }

    explanationElement.textContent = `${q.explanation}`;

    const buttons =
        document.querySelectorAll(".choice-btn");

    buttons.forEach(btn => {
        btn.disabled = true;
    });

    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", function () {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestions();
    } else {
        //GAタグ
        gtag('event', 'quiz_complete', {
            category: selectedCategory,
            score: score,
            total: questions.length
        });
        if (score === questions.length){
            //全問正解の時
            location.href = "scratch.html";
        } else {
            document.querySelector(".container").innerHTML = `
                <div style="text-align: center;">
                <h1>終了</h1>
                <h1>${questions.length}問中 ${score}問正解</h1>
                <p>再チャレンジしよう😼</p>
            
                <button id="restartBtn">
                    もう一度挑戦
                </button>
                </div>
            `;

            document.getElementById("restartBtn").addEventListener("click", function () {
                currentQuestion = 0;
                score = 0;
                location.reload();
            });
        }
    }    
    
});

loadQuestions();