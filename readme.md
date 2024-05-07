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

### Login
In the footer of every page it dislays the currently logged in user. This info is stored as a key in the browsers local storage. It has a logout button that simply removes the key from local storage and a change button that takes you to the login screen. You need to be logged in to access the workouts.

## AI


### Prompts to develop XYZ (exmaple)
A sequence of prompts helped me develop this feature:

>  this is an example prompt given to a chatbot
The response was proved useless because the prompt wasn't specific enough about XYZ, so:

### Prompts to develop GHIJ (exmaple)

>  this is an example prompt given to a chatbot
words words words etc.
