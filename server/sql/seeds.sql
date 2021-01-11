INSERT INTO users (username, email) 
VALUES ('Test User', 'test@test.ca');

INSERT INTO movies (title, year, imdbID, country, revenue_usd) 
VALUES ('Hey Ram', 2000, 'tt0222012', 'India', 274675);

INSERT INTO nominations (user_id, movie_id)
VALUES (1, 'tt0222012');
