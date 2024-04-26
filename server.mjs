import express from 'express';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const app = express();

app.use(express.static('webpages'));

app.get('/api/workouts', async (req, res) => {
  const userID = req.query.userId;
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
  const workouts = await db.all('SELECT data FROM workouts JOIN user_workouts ON workouts.id = user_workouts.workout_id JOIN users ON user_workouts.user_id = users.id WHERE users.id = ?;', userID);
  const parsedWorkouts = workouts.map(workout => JSON.parse(workout.data));
  res.json(parsedWorkouts);
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

// Adds a new workout to the database
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
app.listen(8080);
