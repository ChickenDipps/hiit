-- Up

CREATE TABLE workouts ( 
  id INTEGER PRIMARY KEY,
  data TEXT NOT NULL,
  user CHAR(36),
  time DATETIME
) ;

-- Down

DROP TABLE workouts;