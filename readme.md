# HIIT up2016662

## Setup
- Make sure [node](https://nodejs.org/en) is installed
- Run `npm i`
- Run `npm run setup`, creates the SQLite database and inserts some users and workouts
- Run `npm start`
- Go to `localhost:8080` in your browser

## Key features
 
### Server design
This website uses an express server that displays static pages from the `webpages` folder and also includes API requests for the SQLite database.

### Choose a workout
In the nav bar there is a `workouts` button (`localhost:8080/workouts.html`) that lists all of the workouts associated with a specific user. In the `setup` script workouts 1 & 2 are allocated to all users. Clicking on the name of any of these workouts will change the page to display a timer along with a list of exercises in the workout along with their associated timings.


### Create a workout
In the nav bar the `Create a workout` button (`localhost:8080/create.hrml`) takes you to a page where you can create your own custom workout. You need to be logged in for this feature to work. This page allows you to input a name, description exercises along with their corresponding timings. There is an `Add another exercise` button that creates 2 new textboxes (exercise and time) allowing the user to make a workout with as many parts as they desire. When the `Create` button is pressed an API call is made to the server which stores the workout in a JSON and links it with the currently signed in user. This allows the newly created workout to be displayed in the `workouts` page.

### Share a workout
Next to each on the workouts page (`localhost:8080/workouts.html`) you can press the share button which will give you a list of all of the other users. WHen shared this will add an entry to the intersection table `user_workouts` which means any changes made to the workout will affect all users that workout is shared with.

### Edit a workout
On the workouts page (`localhost:8080/workouts.html`) you can press the edit button next to a workout and change the parameters of said workout. Note if the workout is shared with any other user it will also edit their copy of the workout.

### Delete a workout
On the workouts page (`localhost:8080/workouts.html`) you can press the delete button which will remove the entry in the user_workouts intersection table. This makes it so workouts shared with other users don't get deleted by one user however, it is possible to have a workout stored that is never used.

### Login
In the footer of every page it dislays the currently logged in user. This info is stored as a key in the browsers local storage. It has a logout button that simply removes the key from local storage and a change button that takes you to the login screen. You need to be logged in to access the workouts.


## AI


### Prompts to develop the create page

>  @workspace for the createButtonAttacher function, when the button is pressed the object is created but it only has the first exercise name but has multiple (correct) timings

> The createButtonAttacher function in webpages/create.mjs creates a workout object when the button is clicked. This object includes an array of exercises and an array of times. The exercises array is populated by iterating over the exercisesArray and pushing each exercise.value into the exercises array. Similarly, the times array is populated by iterating over the timesArray and pushing each time.value into the times array. If the exercises array only contains the first exercise name, it could be due to the following reasons: The querySelectorAll('.exercise') is not selecting all the exercise elements correctly. Ensure that all exercise elements have the class 'exercise'. The exercise.value is not retrieving the correct value for each exercise. Ensure that the value attribute is correctly set for each exercise element. There might be an issue with the timing of when the button click event is fired and when the exercises are added to the page. If the exercises are added to the page after the button click event listener is attached, the querySelectorAll('.exercise') will not include these exercises. To fix this, you could move the code that attaches the event listener to a function that is called after all exercises are added to the page.

The response was helpful as it made me realise I forgot to add the class property of the exercises added by the "Add another exercise" button.

### Prompts to develop the api/workouts call

>  @workspace What is wrong with the SELECT statement for the workouts api call

> The issue with the SELECT statement in the /api/workouts endpoint in the server.mjs file is that it's trying to join user_workouts with users on user_workouts = users.id. However, user_workouts is a table, not a column.
Here is the problematic line:

`const workouts = await db.all('SELECT data FROM workouts JOIN user_workouts ON workout.id = user_workouts.workout_id JOIN users ON user_workouts = users.id WHERE users.id = ?;', userID);`

> You should specify the correct column from the user_workouts table to join on users.id. If the column in user_workouts table that contains the user id is user_id, the corrected SQL statement would be:

`const workouts = await db.all('SELECT data FROM workouts JOIN user_workouts ON workout.id = user_workouts.workout_id JOIN users ON user_workouts.user_id = users.id WHERE users.id = ?;', userID);`

