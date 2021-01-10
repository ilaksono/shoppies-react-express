DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS movies CASCADE;
DROP TABLE IF EXISTS nominations CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  CONSTRAINT UC_email UNIQUE(email)
);

CREATE TABLE movies (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  year INTEGER,
  imdbID VARCHAR(255) NOT NULL UNIQUE,
  CONSTRAINT UC_imdbID UNIQUE(imdbID)
);

CREATE TABLE nominations (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  movie_id VARCHAR(255) REFERENCES movies(imdbID) ON DELETE CASCADE,
  time TIMESTAMP NOT NULL DEFAULT Now()  
);
