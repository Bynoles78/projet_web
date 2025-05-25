const questions = [
  {
    question: "1. Laquelle de ces marques existe ?",
    name: "q1",
    options: { a: "lamborgamborg", b: "Koenigsegg", c: "dogde" },
    correct: "b"
  },
  {
    question: "2. Laquelle de ces marques possède une écurie F1 ?",
    name: "q2",
    options: { a: "Honda", b: "Monsters", c: "Williams" },
    correct: "c"
  },
  {
    question: "3. Quelle est la voiture de serie la plus rapide du monde officiellement?",
    name: "q3",
    options: { a: "Thrust SSC", b: "koenigsegg Jesko attack", c: "bugatti chiron SS 300+" },
    correct: "c"
  },
  {
    question: "4. Quel moteur a la Ferrari LaFerrari ?",
    name: "q4",
    options: { a: "V12 hybride", b: "V12 atmo", c: "V8 biturbo" },
    correct: "a"
  },
  {
    question: "5. Combien de chevaux a la Porsche 718 GT4 RS d'origine?",
    name: "q5",
    options: { a: "512ch", b: "414ch", c: "352ch" },
    correct: "b"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let bruteForceEnCours = false;

const quizContainer = document.getElementById("quizContainer");
const resultatDiv = document.getElementById("resultat");
const validateBtn = document.getElementById("validateBtn");
const formulaireBtn = document.getElementById("formulaireBtn");
const restartBtn = document.getElementById("restartBtn");
const bruteForceBtn = document.getElementById("bruteForceBtn");
const stopBtn = document.getElementById("stopBtn");

function showQuestion(index) {
  const q = questions[index];
  quizContainer.innerHTML = `
    <p class="font-semibold">${q.question}</p>
    ${Object.entries(q.options).map(([key, value]) =>
      `<label class="block">
        <input type="radio" name="${q.name}" value="${key}" class="mr-2"> ${value}
      </label>`
    ).join("")}
  `;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  formulaireBtn.classList.add("hidden");
  restartBtn.classList.add("hidden");
  resultatDiv.textContent = "";
  showQuestion(currentQuestionIndex);
}

validateBtn.onclick = () => {
  const currentQ = questions[currentQuestionIndex];
  const selected = document.querySelector(`input[name="${currentQ.name}"]:checked`);

  if (!selected) {
    resultatDiv.textContent = "Veuillez sélectionner une réponse.";
    resultatDiv.className = "mt-6 text-center text-red-600 font-semibold";
    return;
  }

  if (selected.value === currentQ.correct) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    finishQuiz();
  }
};

function finishQuiz() {
  quizContainer.innerHTML = "";
  resultatDiv.classList.remove("text-red-600", "text-green-600", "text-red-400", "text-green-400", "text-[#ffe600]");
  if (score === questions.length) {
    resultatDiv.textContent = `Bravo ! Vous avez tout juste (${score}/${questions.length}).`;
    resultatDiv.classList.add("text-[#ffe600]");
    formulaireBtn.classList.remove("hidden");
  } else {
    resultatDiv.textContent = `Score : ${score}/${questions.length}. Vous devez recommencer.`;
    resultatDiv.classList.add("text-red-400");
    restartBtn.classList.remove("hidden");
  }
}

bruteForceBtn.onclick = () => {
  bruteForceEnCours = true;
  stopBtn.classList.remove("hidden");
  formulaireBtn.classList.add("hidden");
  restartQuiz();

  function tryNextOption(qIndex, optionIndex = 0) {
    if (!bruteForceEnCours || qIndex >= questions.length) {
      bruteForceEnCours = false;
      stopBtn.classList.add("hidden");
      finishQuiz();
      return;
    }

    const q = questions[qIndex];
    const options = Object.keys(q.options);

    if (optionIndex >= options.length) {
      console.log("Aucune réponse correcte trouvée.");
      bruteForceEnCours = false;
      stopBtn.classList.add("hidden");
      finishQuiz();
      return;
    }

    const val = options[optionIndex];
    showQuestion(qIndex);

    setTimeout(() => {
      const radio = document.querySelector(`input[name="${q.name}"][value="${val}"]`);
      if (radio) radio.checked = true;

      setTimeout(() => {
        if (val === q.correct) {
          score++;
          currentQuestionIndex++;
          tryNextOption(currentQuestionIndex, 0);
        } else {
          tryNextOption(qIndex, optionIndex + 1);
        }
      }, 300);
    }, 300);
  }

  tryNextOption(0, 0);
};

stopBtn.onclick = () => {
  bruteForceEnCours = false;
  stopBtn.classList.add("hidden");
};

window.onload = () => {
  showQuestion(currentQuestionIndex);
};