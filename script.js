const questions = [
    {
        "quest": "人工知能は有限の処理能力しかないため、現実に起こりうる問題すべてに対処することができない (　) がある",
        "correct": "フレーム問題",
        "choices": ["フレーム問題", "ブラックボックス問題", "シンボルグラウンディング問題", "最適化問題"]
    },
    {
        "quest": "第2次AIブームで登場、知識を明示的な形で記述することの難しさがネックとなったものとは",
        "correct": "エキスパートシステム",
        "choices": ["エキスパートシステム", "ディープラーニング", "コグニティブコンピューティング", "機械学習"]
    },
    {
        "quest": "画像中の物体認識の精度を競う国際コンテスト ILSVRCにて2015年にMicrosoft社が開発、高い認識率を示したスキップ結合を特徴とするモデルとは",
        "correct": "ResNet",
        "choices": ["ResNet", "AlexNet", "ZFNet", "VGGNet"]
    }
];

let currentQuestion = 0;
let score = 0;

const wordElement = document.getElementById("quest");
const choicesElement = document.getElementById("choices");
const resultElement = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const questionCountElement = document.getElementById("question-count");

function showQuestions() {

    const q = questions[currentQuestion];

    questionCountElement.textContent =
        `${currentQuestion + 1} / ${questions.length}`;

    wordElement.textContent = q.quest;

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
        resultElement.textContent = "✅ 正解！";
        resultElement.style.color = "green";
        score++;
    } else {
        resultElement.textContent =
            `❌ 不正解！正解は「${q.correct}」`;
        resultElement.style.color = "red";
    }

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
        document.querySelector(".container").innerHTML = `
            <h1>終了！</h1>
            <h1>3問中 ${score}問正解</h1>
            <p>お疲れさまでした！</p>
            
            <button id="restartBtn">
                もう一度挑戦
            </button>
        `;

        document.getElementById("restartBtn").addEventListener("click", function () {
            currentQuestion = 0;
            score = 0;
            location.reload();
        });
    }    
    
});

showQuestions();
