
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".movie-carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;

const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;


let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);


carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });


carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});


carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");

  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;

  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {

  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }


  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return;

  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


let backbtn = document.querySelector(".back-to-top");
const scrollBtnDisplay = function () {
  window.scrollY > 100
    ? backbtn.classList.add("show")
    : backbtn.classList.remove("show");
};
window.addEventListener("scroll", scrollBtnDisplay);

const scrollWindow = function () {
  if (window.scrollY != 0) {
    setTimeout(function () {
      window.scrollTo(0, window.scrollY - 50);
      scrollWindow();
    }, 10);
  }
};
backbtn.addEventListener("click", scrollWindow);


const movieQuotes = [
  "No amount of money ever bought a second of time - Avengers: Endgame",
  "May the Force be with you - Star Wars",
  "My mama always said life was like a box of chocolates. You never know what you're gonna get. - Forest Gump",
  "Why so serious? - The Dark Knight",
  "It's not who I am underneath, but what I do that defines me. - Batman Begins",
  "I'm the king of the world! - Titanic",
  "Keep your friends close, but your enemies closer. - The Godfather II",
  "No man can win every battle, but no man should fall without struggle - Spiderman: Homecoming",
  "I'm gonna make him an offer he can't refuse. - The Godfather",
  "I feel the need—the need for speed! - Top Gun"
];


const displayRandomQuote = () => {
  const quoteElement = document.getElementById("quote");
  const randomIndex = Math.floor(Math.random() * movieQuotes.length);
  quoteElement.textContent = movieQuotes[randomIndex];
};


let quizQuestions = [
  {
    question: "What is the name of the first Harry Potter movie?",
    options: ["The Sorcerer's Stone", "The Chamber of Secrets", "The Goblet of Fire", "The Prisoner of Azkaban"],
    answer: "The Sorcerer's Stone"
  },
  {
    question: "In which year was the original Star Wars movie released?",
    options: ["1975", "1977", "1980", "1983"],
    answer: "1977"
  },
  {
    question: "Who directed 'The Dark Knight'?",
    options: ["Steven Spielberg", "Quentin Tarantino", "Christopher Nolan", "James Cameron"],
    answer: "Christopher Nolan"
  },
  {
    question: "What is the name of the island in Jurassic Park?",
    options: ["Isla Sorna", "Isla Nublar", "Isla Muerta", "Isla Cráneo"],
    answer: "Isla Nublar"
  },
  {
    question: "In The Avengers, what is the name of Thor’s hammer?",
    options: ["Vanir", "Mjolnir", "Aesir", "Norn"],
    answer: "Mjolnir"
  },
  {
    question: "What is the name of the fictional African country in Black Panther?",
    options: ["Wakanda", "Zamunda", "Genosha", "Madripoor"],
    answer: "Wakanda"
  },
  {
    question: "In which year did the first Iron Man movie come out, kicking off the Marvel Cinematic Universe?",
    options: ["2005", "2008", "2010", "2012"],
    answer: "2008"
  },
  {
    question: "Who played Jack in Titanic?",
    options: ["Leonardo DiCaprio", "Brad Pitt", "Johnny Depp", "Matt Damon"],
    answer: "Leonardo DiCaprio"
  },
  {
    question: "Which movie won the first Academy Award for Best Animated Feature?",
    options: ["Shrek", "Toy Story", "Finding Nemo", "The Lion King"],
    answer: "Shrek"
  },
  {
    question: "In Inception, what is the object used by the characters to determine if they are in a dream?",
    options: ["A Watch", "A Ring", "A Coin", "A Spinning Top"],
    answer: "A Spinning Top"
  }
];


quizQuestions = quizQuestions.sort(() => Math.random() - 0.5);

let currentQuestionIndex = 0;
let userAnswer = '';


window.onload = function () {
  displayRandomQuote();
  loadQuestion();
};


function loadQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const submitBtn = document.getElementById("submit-answer");
  const feedbackElement = document.getElementById("quiz-feedback");
  const nextQuestionBtn = document.getElementById("next-question");


  optionsElement.innerHTML = '';
  feedbackElement.textContent = '';
  nextQuestionBtn.style.display = 'none';
  submitBtn.disabled = true;


  const currentQuestion = quizQuestions[currentQuestionIndex];


  questionElement.textContent = currentQuestion.question;


  currentQuestion.options.forEach(option => {
    const optionBtn = document.createElement('button');
    optionBtn.textContent = option;
    optionBtn.addEventListener('click', () => {
      userAnswer = option;
      submitBtn.disabled = false;
    });
    optionsElement.appendChild(optionBtn);
  });
}


document.getElementById("submit-answer").addEventListener('click', () => {
  const feedbackElement = document.getElementById("quiz-feedback");
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const nextQuestionBtn = document.getElementById("next-question");


  if (userAnswer === currentQuestion.answer) {
    feedbackElement.textContent = "Correct!";
    feedbackElement.style.color = "#00ff00";
  } else {
    feedbackElement.textContent = `Wrong! The correct answer is: ${currentQuestion.answer}`;
    feedbackElement.style.color = "#ff0000";
  }


  document.getElementById("submit-answer").disabled = true;
  nextQuestionBtn.style.display = 'inline-block';
});


document.getElementById("next-question").addEventListener('click', () => {
  currentQuestionIndex++;


  if (currentQuestionIndex >= quizQuestions.length) {
    currentQuestionIndex = 0;
    quizQuestions = quizQuestions.sort(() => Math.random() - 0.5);
  }

  loadQuestion();
});
