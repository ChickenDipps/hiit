import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function init() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
    verbose: true,
  });
  await db.run('CREATE TABLE workouts (id INTEGER PRIMARY KEY, data TEXT NOT NULL, user CHAR(36), time DATETIME)');
  await db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT');
  await db.run('INSERT INTO users (name) VALUES ("Lily"), ("Mark"), "Matt"');
  const workoutData = [{
    id: '1',
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
    id: '2',
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
    await db.run('INSERT INTO workouts (data, user) VALUES (?, ?)', JSON.stringify(workout), 1);
  }
  return db;
}

init();
