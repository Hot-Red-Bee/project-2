const gameButton = document.getElementById('gameButton');
const gameSection = document.getElementById('gameSection');
const inputField = document.getElementById('input');
const quoteDisplay = document.getElementById('quote');
const timerDisplay = document.getElementById('timer');
const resultDisplay = document.getElementById('result');
const resetButton = document.getElementById('resetButton');
const shareButton = document.getElementById('shareButton');
const stopGameButton = document.getElementById('stopGame');

let startTime;
let interval;
let isGameRunning = false;
let lastQuoteIndex = -1;

const quotes = [
  "The quick brown fox jumps over the lazy dog",
  "Coding is like humor. If you have to explain it, it’s bad.",
  "Simplicity is the soul of efficiency.",
  "Debugging is like being the detective in a crime movie where you are also the murderer.",
  "Experience is the name everyone gives to their mistakes.",
  "In order to be irreplaceable, one must always be different.",
  "Java is to JavaScript what car is to Carpet.",
  "Knowledge is power.",
  "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday’s code.",
  "The best way to get a project done faster is to start sooner.",
  "The function of good software is to make the complex appear to be simple.",
  "The most disastrous thing that you can ever learn is your first programming language.",
  "The only way to go fast, is to go well.",
  "There are only two kinds of programming languages: those people always bitch about and those nobody uses.",
  "Walking on water and developing software from a specification are easy if both are frozen."
];

const getRandomQuote =() => {
  let index;
  do {
    index = Math.floor(Math.random() * quotes.length);
  } while (index === lastQuoteIndex);
  lastQuoteIndex = index;
  return quotes[index];
}

const startGame= () => {
   if (isGameRunning) {
    stopGame();
  } else {
    gameSection.style.display = 'block';
    quoteDisplay.textContent = getRandomQuote();
    inputField.value = '';
    inputField.focus();
    startTime = new Date();
    resultDisplay.textContent = '';
    timerDisplay.textContent = 'Time: 0s';
    interval = setInterval(updateTimer, 1000);
    isGameRunning = true;
  }
}

const stopGame =() => {
  clearInterval(interval);
  gameSection.style.display = 'none';
  resultDisplay.textContent = '';
  timerDisplay.textContent = 'Time: 0s';
  gameButton.textContent = 'Start Game';
  isGameRunning = false;
}

const updateTimer=() => {
  const elapsedTime = Math.floor((new Date() - startTime) / 1000);
  timerDisplay.textContent = `Time: ${elapsedTime}s`;
}

const checkInput =() => {
  const typedText = inputField.value;
  const originalText = quoteDisplay.textContent;

  if (typedText === originalText) {
    clearInterval(interval);
    const totalTime = Math.floor((new Date() - startTime) / 1000);
    resultDisplay.textContent = `You finished in ${totalTime} seconds!`;
    gameButton.textContent = 'Start Game';
    isGameRunning = false;
  }
}

const resetGame= () => {
  clearInterval(interval);
  gameSection.style.display = 'block';
  quoteDisplay.textContent = getRandomQuote();
  inputField.value = '';
  inputField.focus();
  startTime = new Date();
  resultDisplay.textContent = '';
  timerDisplay.textContent = 'Time: 0s';
  interval = setInterval(updateTimer, 1000);
  isGameRunning = true;
}

const shareResult =()=> {
  const resultText = resultDisplay.textContent;
  const shareMessage = encodeURIComponent(`I just finished KeySprint! ${resultText}`);
  const shareUrl = `https://twitter.com/intent/tweet?text=${shareMessage}`;
  window.open(shareUrl, '_blank');
}

// Disable copying in the input field
inputField.addEventListener('copy', (e) => {
  e.preventDefault();
});

// Optionally, disable copying everywhere
 document.addEventListener('copy', (e) => {
   e.preventDefault();
});

gameButton.addEventListener('click', startGame);
inputField.addEventListener('input', checkInput);
resetButton.addEventListener('click', resetGame);
shareButton.addEventListener('click', shareResult);
stopGameButton.addEventListener('click', stopGame);