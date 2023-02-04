// Promise based API //
// " implement a promise-based API, you'll be wrapping an asynchronous operation, which might use events, or plain callbacks, or a message-passing model. You'll arrange for a Promise object to handle the success or failure of that operation properly."

// Alarm API = alarm() //

// setTimeout() <--- starts a timer to set delay, when time expires it calls the function.
//example:
<button id="set-alarm">Set alarm</button>
<div id="output"></div>

const output = document.querySelector('#output');
const button = document.querySelector('#set-alarm');

function setAlarm() {
  setTimeout(() => { //<------------------- Call.
    output.textContent = 'Wake up!';//<---- message
  }, 1000);//<----------------------------- Delay's 1000 miliseconds.
}

button.addEventListener('click', setAlarm); //<---- button feature.

// Promise() Constructor // *constructor takes a single function as an argument

// This *executor* function itself takes two arguments, which are both also functions, and which are conventionally called resolve and reject.

function alarm(person, delay) {
    return new Promise((resolve, reject) => { //<--the two arguments, also creates a new Promise.
      if (delay < 0) { //<---check if the delay is not negative
        throw new Error('Alarm delay must not be negative'); //<--throws an error if so...
      }
      setTimeout(() => {
        resolve(`Wake up, ${person}!`);
      }, delay);
    });
  }

//using the alarm() API //
const name = document.querySelector('#name');
const delay = document.querySelector('#delay');
const button = document.querySelector('#set-alarm');
const output = document.querySelector('#output');

function alarm(person, delay) { 
  return new Promise((resolve, reject) => { c
    if (delay < 0) {
      throw new Error('Alarm delay must not be negative');
    }
    setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

button.addEventListener('click', () => {
  alarm(name.value, delay.value)//<----------------------------------------------- calling alarm
    .then((message) => output.textContent = message)//<-------------------------- -calling then' = successful call
    .catch((error) => output.textContent = `Couldn't set alarm: ${error}`);//<---- calling catch' = rejected / fail call
});

//Using async and await with the alarm() API//
const name = document.querySelector('#name');
const delay = document.querySelector('#delay');
const button = document.querySelector('#set-alarm');
const output = document.querySelector('#output');

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error('Alarm delay must not be negative');
    }
    setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

button.addEventListener('click', async () => { //<---- here's the async call (promise chain)
  try {
    const message = await alarm(name.value, delay.value);//<---- here's the await (promise chain)
    output.textContent = message;
  }
  catch (error) {
    output.textContent = `Couldn't set alarm: ${error}`;
  }
});
