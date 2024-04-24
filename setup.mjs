import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function init() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
    verbose: true,
  });
  // Create the tables
  await db.run('DROP TABLE IF EXISTS workouts');
  await db.run('DROP TABLE IF EXISTS users');
  await db.run('DROP TABLE IF EXISTS user_workouts');
  await db.run('CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY, data TEXT NOT NULL, time DATETIME)');
  await db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)');
  await db.run('CREATE TABLE IF NOT EXISTS user_workouts (user_id INTEGER, workout_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id), FOREIGN KEY(workout_id) REFERENCES workouts(id))');

  // Inseting data
  await db.run('INSERT INTO users (name) VALUES ("Lily"), ("Mark"), ("Matt")');
  await db.run('INSERT INTO user_workouts (user_id, workout_id) VALUES (1, 1), (1, 2), (2, 1), (2,2), (3,1), (3, 2)');
  const workoutData = [{
    name: 'Workout 1',
    description: 'Feebly doo feebly da',
    timings: [
      '5:00',
      '1:00',
      '3:00',
      '1:00',
      '4:00',
    ],
    exercises: [
      'Jumping Jacks',
      'Rest',
      'Pushups',
      'Rest',
      'Squats',
    ],
  },
  {
    name: 'Workout 2',
    description: 'Feebly doo feebly da',
    timings: [
      '5:00',
      '1:00',
      '3:00',
      '1:00',
      '4:00',
    ],
    exercises: [
      'Jumping Jacks',
      'Rest',
      'Pushups',
      'Rest',
      'Squats',
    ],
  }];
  for (const workout of workoutData) {
    await db.run('INSERT INTO workouts (data, time) VALUES (?, ?)', JSON.stringify(workout), new Date().toISOString());
  }
  return db;
}

init();
