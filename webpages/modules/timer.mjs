
let intervalId;

// Checks if the start button is clicked, if so, it starts the timer
export function startButtonAttacher(workout) {
  const button = document.querySelector('#start');
  let currentTiming = 0;
  button.addEventListener('click', () => {
    console.log('Start button clicked');

    // Start the timer
    intervalId = setInterval(() => {
      const input = document.querySelector('#timerInput').value;
      const inputArray = input.split(':');
      let minutes = parseInt(inputArray[0]);
      let seconds = parseInt(inputArray[1]);
      if (seconds === 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      const newTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      document.querySelector('#timerInput').value = newTime;

      const timings = workout.timings;
      console.log('Current workout: ' + workout.exercises[currentTiming]);

      // Check if the timer is at 0:00, if so, move to the next workout
      if (input === '0:00') {
        if (currentTiming < timings.length - 1) {
          currentTiming++;
          console.log('Next workout: ' + workout.exercises[currentTiming]);
          document.querySelector('#timerInput').value = timings[currentTiming];
        } else {
          console.log('Workout complete');
          clearInterval(intervalId);
          document.querySelector('#timerInput').value = '0:00';
        }
      }
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

export function main(workout) {
  startButtonAttacher(workout);
  stopButtonAttacher();
  timerBoxAttacher();
}
