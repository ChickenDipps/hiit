import express from 'express';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// Sets up express to serve the webpages directory
const app = express();
app.use(express.static('webpages'));
app.listen(8080);

// Retrieves the list of workouts associated with the currently logged in user from the database
app.get('/api/workouts', async (req, res) => {
  const userID = req.query.userId;
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
  const workouts = await db.all('SELECT workouts.id, workouts.* FROM workouts JOIN user_workouts ON workouts.id = user_workouts.workout_id JOIN users ON user_workouts.user_id = users.id WHERE users.id = ?;', userID);
  res.json(workouts);
});

// Retrieves the list of users from the database
app.get('/api/users', async (req, res) => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
  const users = await db.all('SELECT * FROM users;');
  res.json(users);
});

// Adds a new workout to the database and associates it with the currently logged in user
app.post('/api/workouts', express.json(), async (req, res) => {
  const workout = req.body;
  const userId = workout.userID;
  delete workout.userID;

  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
  const workoutId = await db.run('INSERT INTO workouts (data, time) VALUES (?, ?)', JSON.stringify(workout), new Date().toISOString());
  await db.run('INSERT INTO user_workouts (user_id, workout_id) VALUES (?, ?)', userId, workoutId.lastID);
  res.json({ success: true });
});

// Shares a workout with another user
app.post('/api/share', express.json(), async (req, res) => {
  const { workoutId, userId } = req.body;
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
  await db.run('INSERT INTO user_workouts (user_id, workout_id) VALUES (?, ?)', userId, workoutId);
  res.json({ success: true });
});
