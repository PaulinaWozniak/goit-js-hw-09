import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix, { Notify } from "notiflix";


const input = document.querySelector('input');
const picker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]'); 


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] <= options.defaultDate) {
        startBtn.disabled = true;
        return Notify.failure("Please choose a date in the future");
      } else {
            startBtn.disabled = false;
            return parseDate(selectedDates);
      }
    },
};

let date = flatpickr(picker, options);
let selectedInMs = null;

startBtn.addEventListener('click', (() => {
input.disabled = true;
const timer = setInterval(() => {
    const time = selectedInMs - Date.now();
    const remainingMs = convertMs(time);
    if (selectedInMs - Date.now() > 0) {
        timeContext(remainingMs);
    } else {
clearInterval(timer);
Notify.success('Time is up!');
startBtn.disabled = false;
input.disabled = false;
    }
},1000);
startBtn.disabled = true;
}));

function parseDate(date) {
    return selectedInMs = Date.parse(date);
}

function timeContext({days, hours, minutes, seconds}) {
    timerDays.textContent = `${days}`;
    timerHours.textContent = `${hours}`;
    timerMinutes.textContent = `${minutes}`;
    timerSeconds.textContent = `${seconds}`;
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
  
