import * as timerModule from './modules/timer.mjs';
import { setLoggedInUser, getUsers } from './modules/login.mjs';

// Gets all workout JSON files that are associated with the user in the user_workouts table
async function getWorkouts() {
  const userID = localStorage.getItem('userId');
  const response = await fetch(`/api/workouts?userId=${encodeURIComponent(userID)}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const query = await response.json();
  const workouts = query.map(workout => {
    const workoutData = JSON.parse(workout.data);
    workoutData.id = workout.id; // Add workout ID to workout data
    return workoutData;
  });
  return workouts;
}


// Displays all the workouts in the workout list
function displayWorkoutList(workouts) {
  console.log('Displaying workouts');
  // const workouts = query.map(workout => JSON.parse(workout.data));
  const workoutList = document.querySelector('#workoutList');
  for (let i = 0; i < workouts.length; i++) {
    const workout = workouts[i];
    console.log(workout);
    console.log(workout.name);
    const workoutListItem = document.createElement('li');
    const workoutButton = document.createElement('button');
    const shareButton = document.createElement('button');

    workoutButton.textContent = (workout.name);
    workoutButton.id = workout.name;
    workoutButton.dataset.workout = JSON.stringify(workout);
    workoutButton.addEventListener('click', workoutButtonClicked);

    shareButton.textContent = 'Share';
    shareButton.dataset.workout = JSON.stringify(workout);
    shareButton.addEventListener('click', (event) => shareButtonClicked(event, workout.id));
    workoutListItem.append(workoutButton);
    workoutListItem.append(shareButton);
    workoutList.append(workoutListItem);
  }
}

async function shareButtonClicked(event) {
  console.log('Share button clicked');
  const workout = JSON.parse(event.target.dataset.workout);
  const workoutId = workout.id;
  const workoutName = workout.name;
  console.log('Workout id:' + workoutId);
  console.log('Workout name:' + workoutName);

  const elem = document.querySelector('#content');
  while (elem.firstChild) { elem.removeChild(elem.firstChild); }

  const template = document.querySelector('#shareTemplate');
  const templateContent = template.content.cloneNode(true);
  const userList = templateContent.querySelector('#userList');
  const users = await getUsers();
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    console.log(typeof user.id);
    console.log(typeof localStorage.getItem('userId'));
    if (user.id !== parseInt(localStorage.getItem('userId'))) {
      const userOption = document.createElement('option');
      userOption.value = user.id;
      userOption.textContent = user.name;
      userList.append(userOption);
    }
  }
  document.querySelector('#content').append(templateContent);
  document.querySelector('#shareButton').addEventListener('click', async () => {
    const selectedUser = userList.value;
    console.log('Sharing workout ' + workoutId + ' with user ' + selectedUser);
    const response = await fetch('/api/share', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ workoutId, userId: selectedUser }),
    });
    if (response.ok) {
      console.log('Workout shared');
    } else {
      console.error('Failed to share workout');
    }
  });
  document.querySelector('#content').append(templateContent);
}

// Removes the elements added by the selection template and adds the workout template
function workoutButtonClicked() {
  // Gets the workout JSON file from the button
  const workout = JSON.parse(this.dataset.workout);
  console.log('Button clicked');
  const workoutName = workout.id;
  console.log(workoutName);

  // Clears the screen
  const elem = document.querySelector('#content');
  while (elem.firstChild) { elem.removeChild(elem.firstChild); }

  // Adds the workout template
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

  // Adds the timer template
  const timer = document.querySelector('#timer');
  const timerContent = timer.content.cloneNode(true);
  timerContent.querySelector('#timerInput').value = workout.timings[0];
  document.querySelector('#content').append(timerContent);
  document.querySelector('#content').append(templateContent);
  timerModule.main(workout);
}

// Loads the selection screen
function loadScreen() {
  console.log('Loading screen');
  const template = document.querySelector('#selection');
  const templateContent = template.content.cloneNode(true);
  document.querySelector('#content').append(templateContent);
}

// Tells the user to login to use the workout page
function noUser() {
  const noUserTemplate = document.querySelector('#noUser');
  const clone = document.importNode(noUserTemplate.content, true);
  document.querySelector('#content').append(clone);
}

async function main() {
  if (localStorage.getItem('userId')) {
    loadScreen();
  } else {
    noUser();
  }

  const workouts = await getWorkouts();
  displayWorkoutList(workouts);
  setLoggedInUser();
}
main();
