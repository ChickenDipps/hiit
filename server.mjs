import express from 'express';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const app = express();

app.use(express.static('webpages'));

app.get('/api/workouts', async (req, res) => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
  const workouts = await db.all('SELECT data FROM workouts;');
  const parsedWorkouts = workouts.map(workout => JSON.parse(workout.data));
  res.json(parsedWorkouts);
});
app.get('/api/users', async (req, res) => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
  const users = await db.all('SELECT name FROM users;');
  res.json(users);
});
app.listen(8080);
