import { checkFormatting } from './modules/timer.mjs';
import { setLoggedInUser } from './modules/login.mjs';

// Loads the create workout screen
function loadScreen() {
  console.log('Loading screen');
  const template = document.querySelector('#create-template');
  const clone = document.importNode(template.content, true);
  document.querySelector('#form').append(clone);
  console.log('Screen loaded');
  const time = document.querySelector('.time');
  time.addEventListener('change', () => {
    time.value = checkFormatting(time.value);
  });
}

// When the new error button is clicked, a exercise and time box is added
function newExerciseAttacher() {
  console.log('Attaching new exercise button');
  const button = document.querySelector('#newExercise');
  button.addEventListener('click', () => {
    console.log('New exercise button clicked');
    const template = document.querySelector('#exercise-template');
    const clone = document.importNode(template.content, true);
    document.querySelector('#form-body').append(clone);
    const times = document.querySelectorAll('.time');
    times.forEach(time => {
      time.addEventListener('change', (event) => {
        event.target.value = checkFormatting(event.target.value);
      });
    });
  });
}

// When the create button is clicked, a workout is added to the database and associated with the currently logged in user
function createButtonAttacher() {
  // Create the workout object from the values in the form
  const button = document.querySelector('#createButton');
  button.addEventListener('click', async () => {
    const workout = {};
    const exercises = [];
    const times = [];
    const exercisesArray = document.querySelectorAll('.exercise');
    const timesArray = document.querySelectorAll('.time');
    exercisesArray.forEach(exercise => {
      exercises.push(exercise.value);
    });

    timesArray.forEach(time => {
      times.push(time.value);
    });

    workout.name = document.querySelector('#name').value;
    workout.description = document.querySelector('#description').value;
    workout.timings = times;
    workout.exercises = exercises;
    workout.userID = localStorage.getItem('userId');

    // Send the workout to the server
    await fetch('/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workout),
    }).then(response => {
      if (response.ok) {
        console.log('Workout created');
        window.location.href = '/workouts.html';
      } else {
        console.error('Failed to create workout');
      }
    });
  });
}

function main() {
  loadScreen();
  newExerciseAttacher();
  createButtonAttacher();
  setLoggedInUser();
}


main();
