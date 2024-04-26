import * as timerModule from './modules/timer.mjs';
import { setLoggedInUser } from './modules/login.mjs';

// Gets all workout JSON files that are in the workoutIndex list
async function getWorkouts() {
  const userID = localStorage.getItem('userId');
  const response = await fetch(`/api/workouts?userId=${encodeURIComponent(userID)}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const workouts = await response.json();
  console.log(workouts);
  return workouts;
}


// Displays all the workouts in the workout list
function displayWorkoutList(workouts) {
  console.log('Displaying workouts');
  const workoutList = document.querySelector('#workoutList');
  for (let i = 0; i < workouts.length; i++) {
    const workout = workouts[i];
    console.log(workout);
    console.log(workout.name);
    const workoutListItem = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = (workout.name);
    button.id = workout.name;
    button.dataset.workout = JSON.stringify(workout);
    button.addEventListener('click', buttonClicked);
    workoutListItem.append(button);
    workoutList.append(workoutListItem);
  }
}

// Removes the elements added by the selection template and adds the workout template
function buttonClicked() {
  const workout = JSON.parse(this.dataset.workout);
  console.log('Button clicked');
  const workoutName = workout.id;
  console.log(workoutName);
  let elem = document.querySelector('#workoutList');
  elem.parentNode.removeChild(elem);
  elem = document.querySelector('p');
  elem.parentNode.removeChild(elem);
  elem = document.querySelector('h1');
  elem.parentNode.removeChild(elem);

  const template = document.querySelector('#workout');
  const templateContent = template.content.cloneNode(true);
  templateContent.querySelector('#workoutName').textContent = workout.name;
  templateContent.querySelector('#workoutDescription').textContent = workout.description;
  const exercises = workout.exercises;
  for (let i = 0; i < exercises.length; i++) {
    const li = document.createElement('li');
    li.textContent = exercises[i] + ' - ' + workout.timings[i];
    templateContent.querySelector('#exerciseList').append(li);
  }

  const timer = document.querySelector('#timer');
  const timerContent = timer.content.cloneNode(true);
  timerContent.querySelector('#timerInput').value = workout.timings[0];
  document.querySelector('#content').append(timerContent);
  document.querySelector('#content').append(templateContent);
  timerModule.main(workout);
}

function loadScreen() {
  console.log('Loading screen');
  const template = document.querySelector('#selection');
  const templateContent = template.content.cloneNode(true);
  document.querySelector('#content').append(templateContent);
}


async function main() {
  loadScreen();
  const workouts = await getWorkouts();
  displayWorkoutList(workouts);
  setLoggedInUser();
}
main();
