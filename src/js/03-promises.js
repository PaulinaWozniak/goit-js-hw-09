import Notiflix, { Notify } from "notiflix";

const form = document.querySelector('.form');
const primeDelay = document.querySelector('input[name="delay"]');
const stepDelay = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');

form.addEventListener('submit', event => {
  event.preventDefault();
  let firstDelay = Number(primeDelay.value);
  let secondDelay = Number(stepDelay.value);
  let amountNumber = Number(amount.value);

  console.log(firstDelay, secondDelay, amountNumber);

  for (let position = 1; position <= amountNumber; position++) {
    createPromise(position, firstDelay)
  .then(({ position, delay }) => {
    Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  });
  firstDelay += secondDelay;
  }
});


function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject ({position, delay})
      }
  }, delay);
};
