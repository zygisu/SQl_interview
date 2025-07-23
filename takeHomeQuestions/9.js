require('dotenv').config();
const Database = require('better-sqlite3');
const database = new Database('movies.db');

const favoriteDirector = process.env.FAVORITE_DIRECTOR;
if (!favoriteDirector) {
    console.error("FAVORITE_DIRECTOR is not set in .env file.");
    process.exit(1);}

const query = (`
SELECT movies.title, ratings.rating
FROM movies
JOIN ratings ON movies.id = ratings.movie_id
JOIN directors ON movies.id = directors.movie_id
JOIN people ON directors.person_id = people.id
WHERE people.name = ?
ORDER BY ratings.rating DESC;
`);

const statement = database.prepare(query);
const results = statement.all(favoriteDirector);

if (results.length === 0) {
    console.log(`No movies found for director: ${favoriteDirector}`);
} else {
    console.log(`Movies directed by ${favoriteDirector}:`);
    for (const row of results) {
        console.log(`Title: ${row.title}, Rating: ${row.rating}`);
    }
}


//Write a Node.js script that reads the local .env file to get a FAVORITE_DIRECTOR variable and access the movie database. 
//The script should return a list of movies the favorite director directed. 
//The list should be ordered by movie rating in descending order. 
//Add a local .env file to your project and add the FAVORITE_DIRECTOR variable to it.