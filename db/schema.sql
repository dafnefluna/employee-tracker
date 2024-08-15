DROP DATABASE IF EXISTS movies_db;
CREATE DATABASE movies_db;

\c movies_db;

/*//TODO: Create a movie table */
CREATE TABLE movie (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250)

);

/*//TODO: Create a review table */
CREATE TABLE review (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    movie_id INTEGER, 
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE SET NULL
);


