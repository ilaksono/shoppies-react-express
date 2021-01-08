INSERT INTO users (username, email) 
VALUES ('Test User', 'test@test.ca');

INSERT INTO movies (title, year, imdbID) 
VALUES ('Hey Ram', 2000, 'tt0222012');

INSERT INTO nominations (users_id, movies_id)
VALUES (1, 1);
