const startBtn = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const startScreen = document.getElementById("start-screen");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const resultScreen = document.getElementById("result-screen");
const resultText = document.getElementById("result-text");
const restartBtn = document.getElementById("restart-btn");
const mainContainer = document.getElementById("main-container");
const animDiv = document.getElementById("character-animation");
const levelHeading = document.getElementById("level-heading");

let currentQuestionIndex = 0;
let score = 0;
let allQuestions = [];

const levels = {
  easy: [
    {
      question: "Who broke Shiva’s bow to marry Sita?",
      options: ["Lakshman", "Bharat", "Ram", "Hanuman"],
      answer: "Ram",
      character: "ram-gif.png"
    },
    {
      question: "Who composed the original Ramayan?",
      options: ["Tulsidas", "Valmiki", "Kamban", "Vyas"],
      answer: "Valmiki",
      character: "valmiki-gif.png"
    },
    {
      question: "Who carried the Sanjeevani herb to save Lakshman?",
      options: ["Jambavan", "Sugreev", "Hanuman", "Vibhishan"],
      answer: "Hanuman",
      character: "hanuman-gif.png"
    },
    {
      question: "Who was the mother of Rama?",
      options: ["Kaikeyi", "Kausalya", "Sumitra", "Mandavi"],
      answer: "Kausalya",
      character: "Kaushalya-gif.png"
    },
    {
      question: "What is the name of Rama’s kingdom?",
      options: ["Ayodhya", "Mithila", "Lanka", "Kishkindha"],
      answer: "Ayodhya",
      character: "Ayodhya-gif.png"
    }
  ],
  medium: [
    {
      question: "What was the name of the mountain Hanuman carried?",
      options: ["Mandara", "Kailasa", "Trikuta", "Dronagiri"],
      answer: "Dronagiri",
      character: "sanjeevani-gif.png"
    },
    {
      question: "Who was the mother of Bharata?",
      options: ["Sumitra", "Kaikeyi", "Kausalya", "Mandavi"],
      answer: "Kaikeyi",
      character: "Kaikeyi-gif.png"
    },
    {
      question: "Who stayed back in Ayodhya during Rama's exile?",
      options: ["Lakshman", "Bharat", "Sita", "Shatrughna"],
      answer: "Bharat",
      character: "Bharat-gif.png"
    },
    {
      question: "Who was crowned king of Lanka after Ravana’s defeat?",
      options: ["Indrajit", "Akshayakumara", "Vibhishan", "Kumbhakarna"],
      answer: "Vibhishan",
      character: "vibhishan-gif.png"
    },
    {
      question: "What was the name of the bridge built to reach Lanka?",
      options: ["Ramsetu", "Lakshman Jhula", "Vaanarpath", "Ravan Dwaar"],
      answer: "Ramsetu",
      character: "Ram Setu.png"
    }
  ],
  hard: [
    {
      question: "Who cursed Ravana that a monkey would burn Lanka?",
      options: ["Brahma", "Vishnu", "Nandi", "Narada"],
      answer: "Nandi",
      character: "Nandi-gif.png"
    },
    {
      question: "Who narrated the Ramayan to Rama's sons?",
      options: ["Lakshman", "Narada", "Valmiki", "Sumantra"],
      answer: "Valmiki",
      character: "valmiki-gif.png"
    },
    {
      question: "Who was the son of Ravana killed by Lakshmana?",
      options: ["Meghanad", "Atikaya", "Indrajit", "Akshayakumara"],
      answer: "Indrajit",
      character: "Indrajeet-gif.png"
    },
    {
      question: "Which sage gave Rama the divine bow and missiles?",
      options: ["Vishwamitra", "Vashishta", "Agastya", "Bharadwaj"],
      answer: "Vishwamitra",
      character: "Vishwamitra.png"
    },
    {
      question: "Who advised Rama to install a Shivalinga at Rameshwaram before crossing the ocean?",
      options: ["Narada", "Vibhishan", "Sage Agastya", "None of the above"],
      answer: "None of the above",
      character: "none-gif.png"
    }
  ]
};

// Shuffle helper
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Merge and tag questions
function mergeQuestions() {
  allQuestions = [];
  Object.entries(levels).forEach(([level, questions]) => {
    const shuffled = [...questions];
    shuffleArray(shuffled);
    shuffled.forEach((q, i) => {
      allQuestions.push({ ...q, level, levelIndex: i + 1, levelLength: questions.length });
    });
  });
}

startBtn.addEventListener("click", () => {
  mergeQuestions();
  startScreen.classList.add("hidden");
  mainContainer.classList.remove("hidden");
  quizScreen.classList.remove("hidden");
  resultScreen.classList.add("hidden");
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
});

restartBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  mainContainer.classList.add("hidden");
  currentQuestionIndex = 0;
  score = 0;
});

function loadQuestion() {
  const q = allQuestions[currentQuestionIndex];
  questionText.textContent = q.question;
  levelHeading.textContent = `Level: ${capitalize(q.level)} (${q.levelIndex}/${q.levelLength})`;
  optionsContainer.innerHTML = "";
  animDiv.innerHTML = "";
  animDiv.classList.add("hidden");

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => checkAnswer(btn, q));
    optionsContainer.appendChild(btn);
  });

  nextBtn.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function checkAnswer(selectedBtn, q) {
  const allBtns = document.querySelectorAll(".option-btn");
  allBtns.forEach(btn => {
    setTimeout(() => btn.disabled = true, 100);
    if (btn.textContent === q.answer) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("wrong");
    }
  });

  showCharacter(q.character);
  if (selectedBtn.textContent === q.answer) score++;
  setTimeout(() => nextBtn.classList.remove("hidden"), 400);
}

nextBtn.addEventListener("click", () => {
  animDiv.classList.add("hidden");
  animDiv.innerHTML = "";
  currentQuestionIndex++;
  if (currentQuestionIndex < allQuestions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  let message = "";
  if (score === 15) {
    message = "🌟 Jai Shri Ram! You are a true Bhakta of Ram!";
  } else if (score >= 11) {
    message = "🔥 So close to perfection! You are truly a devoted learner!";
  } else if (score >= 6) {
    message = "✨ You know a lot! But more wonders of Ramayanam await you!";
  } else {
    message = "📖 You’ve just started your journey. Keep reading Ramayanam, noble soul!";
  }

  resultText.textContent = `You scored ${score}/15. ${message}`;
}

function showCharacter(imgFile) {
  animDiv.classList.remove("hidden");
  animDiv.innerHTML = `<img src="images/${imgFile}" alt="Character" class="character-gif" />`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('✅ Service Worker Registered'))
    .catch(err => console.log('❌ Service Worker failed:', err));
}
