function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const docBody = document.querySelector('body');
let timer = null;

startBtn.addEventListener('click', handleStart);
stopBtn.addEventListener('click', handleStop);

function handleStart() {
    startBtn.disabled = true;
    timer = setInterval(() => {
        docBody.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function handleStop() {
    clearInterval(timer);
    startBtn.disabled = false;
}

