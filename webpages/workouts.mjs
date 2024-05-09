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
  // Itterates through the workouts and adds them to the list
  console.log('Displaying workouts');
  const workoutList = document.querySelector('#workoutList');
  for (let i = 0; i < workouts.length; i++) {
    const workout = workouts[i];
    console.log(workout);
    console.log(workout.name);
    const workoutListItem = document.createElement('li');
    const workoutButton = document.createElement('button');
    const editButton = document.createElement('button');
    const shareButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    workoutButton.textContent = (workout.name);
    workoutButton.id = workout.name;
    workoutButton.dataset.workout = JSON.stringify(workout);
    workoutButton.addEventListener('click', workoutButtonClicked);

    editButton.textContent = 'Edit';
    editButton.dataset.workout = JSON.stringify(workout);
    editButton.addEventListener('click', (event) => editButtonClicked(event, workout.id));

    shareButton.textContent = 'Share';
    shareButton.dataset.workout = JSON.stringify(workout);
    shareButton.addEventListener('click', (event) => shareButtonClicked(event, workout.id));

    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (event) => deleteButtonClicked(event, workout.id));

    workoutListItem.append(workoutButton);
    workoutListItem.append(editButton);
    workoutListItem.append(shareButton);
    workoutListItem.append(deleteButton);
    workoutList.append(workoutListItem);
  }
}

// When the delete button is clicked, it deletes the workout from the intersection table (keeps the workout in the workout table)
async function deleteButtonClicked(event, workoutId) {
  console.log('Delete button clicked');
  const userId = localStorage.getItem('userId');
  const response = await fetch(`/api/deleteWorkout/${workoutId}/${userId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    console.log('Workout deleted');
    window.location.href = '/workouts.html';
  } else {
    console.error('Failed to delete workout');
  }
}

function editButtonClicked(event, workoutId) {
  console.log('Edit button clicked');
  const workout = JSON.parse(event.target.dataset.workout);
  console.log(workout);
  console.log(workoutId);

  // Clears the screen
  const content = document.querySelector('#content');
  while (content.firstChild) { content.removeChild(content.firstChild); }

  // Adds the edit template
  const template = document.querySelector('#editTemplate');
  const templateContent = template.content.cloneNode(true);
  const exerciseTemplate = document.querySelector('#exerciseTemplate');
  document.querySelector('#content').append(templateContent);
  document.querySelector('#editName').value = workout.name;
  document.querySelector('#editDescription').value = workout.description;

  // Adds the exercises to the edit template
  for (let i = 0; i < workout.exercises.length; i++) {
    const exerciseTemplateContent = exerciseTemplate.content.cloneNode(true);
    const exercises = exerciseTemplateContent.querySelectorAll('.exercise');
    const times = exerciseTemplateContent.querySelectorAll('.time');

    if (exercises.length > 0) {
      exercises[exercises.length - 1].value = workout.exercises[i];
    }

    if (times.length > 0) {
      times[times.length - 1].value = workout.timings[i];
    }
    document.querySelector('#editBody').append(exerciseTemplateContent);
  }
  document.querySelector('#editButton').addEventListener('click', async () => {
    workout.name = document.querySelector('#editName').value;
    workout.description = document.querySelector('#editDescription').value;
    workout.exercises = [];
    workout.timings = [];
    const exercises = document.querySelectorAll('.exercise');
    const times = document.querySelectorAll('.time');
    for (let i = 0; i < exercises.length; i++) {
      workout.exercises.push(exercises[i].value);
      workout.timings.push(times[i].value);
    }
    await fetch(`/api/editWorkout/${workoutId}`, {
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
        console.error('Failed to edit workout');
      }
    });
  });
  document.querySelector('#back').addEventListener('click', () => {
    window.location.href = '/workouts.html';
  });
}

// When the share button is clicked, it displays a list of users to share the workout with
async function shareButtonClicked(event) {
  // Gets the workout JSON file from the button
  console.log('Share button clicked');
  const workout = JSON.parse(event.target.dataset.workout);
  const workoutId = workout.id;
  const workoutName = workout.name;
  console.log('Workout id:' + workoutId);
  console.log('Workout name:' + workoutName);

  // Clears the screen
  const elem = document.querySelector('#content');
  while (elem.firstChild) { elem.removeChild(elem.firstChild); }

  // Adds the share template
  const template = document.querySelector('#shareTemplate');
  const templateContent = template.content.cloneNode(true);
  const userList = templateContent.querySelector('#userList');
  const users = await getUsers();

  // Adds all the users to the list except the current user so you don't share with yourself
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
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
  document.querySelector('#back').addEventListener('click', () => {
    window.location.href = '/workouts.html';
  });
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
  timerContent.querySelector('#timerInput').textContent = workout.timings[0];
  document.querySelector('#content').append(timerContent);
  document.querySelector('#content').append(templateContent);
  timerModule.main(workout);
  document.querySelector('#back').addEventListener('click', () => {
    window.location.href = '/workouts.html';
  });
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
