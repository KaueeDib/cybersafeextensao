const questions = [
  {
    text: "Uma pessoa compartilhou um conteúdo para humilhar um colega. O que fazer?",
    answers: [
      ["Compartilhar também para que outras pessoas vejam.", false],
      ["Não compartilhar e avisar um adulto de confiança.", true],
      ["Fazer uma publicação para atacar quem começou.", false]
    ],
    correctFeedback: "Boa escolha. Não espalhar o conteúdo e buscar apoio ajuda a interromper o ciclo.",
    wrongFeedback: "Essa atitude pode aumentar o problema. Evite compartilhar o conteúdo e procure apoio."
  },
  {
    text: "Você recebeu uma mensagem ofensiva. Qual atitude é mais adequada?",
    answers: [
      ["Responder imediatamente com outra ofensa.", false],
      ["Ignorar sempre e nunca contar para ninguém.", false],
      ["Guardar o registro e procurar ajuda de um adulto.", true]
    ],
    correctFeedback: "Isso. Guardar registros e buscar apoio pode ajudar a compreender e enfrentar a situação.",
    wrongFeedback: "Uma atitude mais segura é guardar o registro e procurar uma pessoa de confiança."
  },
  {
    text: "Qual atitude contribui para um ambiente online mais seguro?",
    answers: [
      ["Pensar antes de publicar e respeitar outras pessoas.", true],
      ["Curtir conteúdos que ridicularizam alguém.", false],
      ["Excluir alguém de um grupo para humilhar.", false]
    ],
    correctFeedback: "Certo. Comunicação responsável e respeito são parte de um comportamento online seguro.",
    wrongFeedback: "O comportamento online seguro começa pelo respeito e pela responsabilidade antes de publicar ou compartilhar."
  }
];

let current = 0;
let score = 0;
let answered = false;

const questionEl = document.querySelector("#question");
const questionTag = document.querySelector("#questionTag");
const answersEl = document.querySelector("#answers");
const feedbackEl = document.querySelector("#feedback");
const nextBtn = document.querySelector("#nextBtn");
const progressBar = document.querySelector("#progressBar");
const progress = document.querySelector(".progress");
const progressLabel = document.querySelector("#progressLabel");
const scorePill = document.querySelector("#scorePill");

function renderQuestion() {
  const item = questions[current];
  answered = false;
  questionEl.textContent = item.text;
  questionTag.textContent = `PERGUNTA ${current + 1}`;
  answersEl.innerHTML = "";
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.classList.add("hidden");
  nextBtn.textContent = current === questions.length - 1 ? "Ver resultado →" : "Próxima pergunta →";

  const percent = ((current + 1) / questions.length) * 100;
  progressBar.style.width = `${percent}%`;
  progress.setAttribute("aria-valuenow", current + 1);
  progressLabel.textContent = `Pergunta ${current + 1} de ${questions.length}`;
  scorePill.textContent = `Pontos: ${score}`;

  item.answers.forEach(([text, correct]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    button.textContent = text;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => selectAnswer(button, correct));
    answersEl.appendChild(button);
  });
}

function selectAnswer(button, correct) {
  if (answered) return;
  answered = true;

  document.querySelectorAll(".answer").forEach((answerButton) => {
    answerButton.disabled = true;
    answerButton.setAttribute("aria-pressed", "false");
  });

  button.setAttribute("aria-pressed", "true");

  if (correct) {
    score++;
    button.classList.add("correct");
    feedbackEl.textContent = questions[current].correctFeedback;
    feedbackEl.classList.add("ok");
  } else {
    button.classList.add("wrong");
    feedbackEl.textContent = questions[current].wrongFeedback;
    feedbackEl.classList.add("no");
  }

  scorePill.textContent = `Pontos: ${score}`;
  nextBtn.classList.remove("hidden");
  feedbackEl.focus?.();
}

function finishGame() {
  questionTag.textContent = "ATIVIDADE CONCLUÍDA";
  questionEl.textContent = `Resultado: ${score} de ${questions.length}`;
  answersEl.innerHTML = "";
  feedbackEl.className = "feedback ok";
  feedbackEl.textContent = score === questions.length
    ? "Excelente! Você reconheceu atitudes mais seguras para o ambiente online."
    : "Bom começo! Você pode revisar as orientações do CyberSafe e tentar novamente.";
  nextBtn.classList.remove("hidden");
  nextBtn.textContent = "Refazer jogo";
  progressLabel.textContent = "Atividade concluída";
  progressBar.style.width = "100%";
  progress.setAttribute("aria-valuenow", questions.length);
  nextBtn.onclick = restartGame;
}

function nextQuestion() {
  if (!answered) return;
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
    document.querySelector("#jogo").scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    finishGame();
  }
}

function restartGame() {
  current = 0;
  score = 0;
  nextBtn.onclick = null;
  renderQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
renderQuestion();

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  });
});

const navLinks = [...document.querySelectorAll(".main-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${entry.target.id}`;
      link.classList.toggle("active", isActive);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => observer.observe(section));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
