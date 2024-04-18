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
  const workouts = await db.all('SELECT * FROM workouts');
  res.json(workouts);
});
app.listen(8080);
