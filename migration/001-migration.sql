-- Up

DROP TABLE IF EXISTS workouts;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS user_workouts;

CREATE TABLE workouts (id INTEGER PRIMARY KEY, data TEXT NOT NULL, time DATETIME);

CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);

CREATE TABLE user_workouts (user_id INTEGER, workout_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id), FOREIGN KEY(workout_id) REFERENCES workouts(id));

INSERT INTO users (name)
VALUES ("Lily"), ("Mark"), ("Matt");

INSERT INTO user_workouts (user_id, workout_id)
VALUES (1,1), (1, 2), (2,1), (2,2), (3,1), (3,2);

INSERT INTO workouts (data, time)
VALUES ( json('{
    "name": "Workout 1",
    "description": "Feebly doo feebly da",
    "timings": [
      "5:00",
      "1:00",
      "3:00",
      "1:00",
      "4:00"
    ],
    "exercises": [
      "Jumping Jacks",
      "Rest",
      "Pushups",
      "Rest",
      "Squats"
    ]
  }'),
datetime('now')), 
(json('{
    "name": "Workout 2",
    "description": "Feebly doo feebly da",
    "timings": [
      "5:00",
      "1:00",
      "3:00",
      "1:00",
      "4:00"
    ],
    "exercises": [
      "Jumping Jacks",
      "Rest",
      "Pushups",
      "Rest",
      "Squats"
    ]
  }'), datetime('now'));


-- Down

DROP TABLE workouts;
DROP TABLE users;
DROP TABLE user_workouts;
