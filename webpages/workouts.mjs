// Gets all workout JSON files that are in the workoutIndex list
async function getWorkouts() {
  const workoutIndex = ['1', '2'];
  const workouts = [];
  for (let i = 0; i < workoutIndex.length; i++) {
    const workout = await fetch(`/workouts/workout${workoutIndex[i]}.json`);
    if (!workout.ok) {
      throw new Error(`HTTP error! status: ${workout.status}`);
    }
    workouts.push(await workout.json());
  }
  console.log(workouts);
  return workouts;
}


// Displays all the workouts in the workout list
function displayWorkoutList(workouts) {
  console.log('Displaying workouts');
  const workoutList = document.querySelector('#workoutList');
  console.log(workoutList);
  console.log(workouts[0]);
  for (let i = 0; i < workouts.length; i++) {
    console.log('Doing Stuff');
    const workout = workouts[i];
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
  console.log('Button clicked');
  const workoutName = this.id;
  console.log(workoutName);
  let elem = document.querySelector('#workoutList');
  elem.parentNode.removeChild(elem);
  elem = document.querySelector('p');
  elem.parentNode.removeChild(elem);
  elem = document.querySelector('h1');
  elem.parentNode.removeChild(elem);

  const template = document.querySelector('#workout');
  const templateContent = template.content.cloneNode(true);
  const workout = JSON.parse(this.dataset.workout);
  templateContent.querySelector('#workoutName').textContent = workout.name;
  templateContent.querySelector('#workoutDescription').textContent = workout.description;
  const exercises = workout.exercises
  for (let i = 0; i < exercises.length; i++) {
    const li = document.createElement('li');
    li.textContent = exercises[i];
    templateContent.querySelector('#exerciseList').append(li);
  }
  document.body.append(templateContent);
  document.body.append(templateContent);
}

function loadScreen() {
  console.log('Loading screen');
  const template = document.querySelector('#selection');
  const templateContent = template.content.cloneNode(true);
  document.body.append(templateContent);
}


async function main() {
  loadScreen();
  const workouts = await getWorkouts();
  displayWorkoutList(workouts);
}
main();
