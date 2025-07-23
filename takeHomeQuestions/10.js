const Database = require('better-sqlite3');
const database = new Database('movies.db');

const movieTitle = 'Oppenheimer';
const movieYear = 2023;
const ratingValue = 9.0;
const votesValue = 10000;

const insertQuery = (`
INSERT INTO ratings (movie_id, rating, votes)
SELECT movies.id, ?, ?
FROM movies
WHERE movies.title = ? AND movies.year = ?
`);

const statement = database.prepare(insertQuery);

const info = statement.run(ratingValue, votesValue, movieTitle, movieYear);

if (info.changes > 0) {
    console.log(`Rating added for "${movieTitle}" (${movieYear}).`);
} else {
    console.log(`No matching movie found for "${movieTitle}" (${movieYear}), or rating already exists.`);
}



//Barbenheimer. In 2023, Christopher Nolan and Greta Gerwig each released a new movie. 
//These movies already exist in the database, but they have no ratings. 
//Write a single query to add a rating to one of these movies. 
//For these movies, you can assume there is only one movie with the same title and year in the database.