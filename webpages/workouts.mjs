// Gets all workout JSON files that are in the workoutIndex list
async function getWorkouts() {
    let workoutIndex = ["workout1", "workout2"]
    let workouts = []
    for (let i = 0; i < workoutIndex.length; i++) {
        let workout = await fetch(`/workouts/${workoutIndex[i]}.json`);
        if (!workout.ok) {
            throw new Error(`HTTP error! status: ${workout.status}`);
        }
        workouts.push(await workout.json());
    }
    console.log(workouts);
    return workouts;
}


//Displays all the workouts in the workout list
function displayWorkouts(workouts) {
    console.log("Displaying workouts");
    let workoutList = document.querySelector("#workoutList");
    console.log(workoutList);
    console.log("this workout is " + workouts[0])
    for (let i = 0; i < workouts.length; i++) {
        console.log("Doing Stuff")
        let workout = workouts[i];
        let workoutListItem = document.createElement("li");
        workoutListItem.textContent = workout.name;
        console.log(workout[i]);
        workoutList.appendChild(workoutListItem);
    }
}


async function main() {
    let workouts = await getWorkouts();
    displayWorkouts(workouts);
}
main();