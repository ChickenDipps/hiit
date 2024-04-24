import { checkFormatting } from './modules/timer.mjs';

function loadScreen() {
  console.log('Loading screen');
  const template = document.querySelector('#create-template');
  const clone = document.importNode(template.content, true);
  document.body.appendChild(clone);
  console.log('Screen loaded');
  const time = document.querySelector('.time');
  time.addEventListener('change', () => {
    time.value = checkFormatting(time.value);
  });
}

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

function createButtonAttacher() {
  const button = document.querySelector('#create-button');
  button.addEventListener('click', () => {
    console.log('Create button clicked');
    const workout = {};
    workout.name = document.querySelector('#name').value;
    workout.description = document.querySelector('#description').value;
    const exercises = [];
    const times = [];
    const timesArray = document.querySelectorAll('.time');
    const exercisesArray = document.querySelectorAll('.exercise');
    timesArray.forEach(time => {
      times.push(time.value);
    });
    exercisesArray.forEach(exercise => {
      exercises.push(exercise.value);
    });
    workout.timings = times;
    workout.exercises = exercises;
  });
}

function main() {
  loadScreen();
  newExerciseAttacher();
  createButtonAttacher();
}


main();
