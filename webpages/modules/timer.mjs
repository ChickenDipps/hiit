
let intervalId;

// Checks if the start button is clicked, if so, it starts the timer
export function startButtonAttacher() {
  const button = document.querySelector('#start');
  button.addEventListener('click', () => {
    console.log('Start button clicked');
    intervalId = setInterval(() => {
      const input = document.querySelector('#timerInput').value;
      const inputArray = input.split(':');
      let minutes = parseInt(inputArray[0]);
      let seconds = parseInt(inputArray[1]);
      if (seconds === 0 && minutes === 0) {
        clearInterval(intervalId);
      } else if (seconds === 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      const newTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      document.querySelector('#timerInput').value = newTime;
    }, 1000);
  });
}

// Checks if the stop button is clicked, if so, it stops the timer
export function stopButtonAttacher() {
  const button = document.querySelector('#stop');
  button.addEventListener('click', () => {
    clearInterval(intervalId);
  });
}

export function timerBoxAttacher() {
  const box = document.querySelector('#timerInput');
  box.addEventListener('change', () => {
    checkFormatting();
  });
}

export function checkFormatting() {
  console.log('Checking formatting');
  let input = document.querySelector('#timerInput').value;
  if (input[2] !== ':' && (input.length <= 2 || input.length >= 4)) {
    console.log('Formatting');
    if (input.length <= 2) {
      input = input + ':00';
      console.log(input);
    } else {
      if (input.length > 4) {
        input = input.substring(input.length - 4);
      }
    }
    document.querySelector('#timerInput').value = input;
  }
}

export function main() {
  startButtonAttacher();
  stopButtonAttacher();
  timerBoxAttacher();
}
