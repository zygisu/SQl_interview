const Database = require('better-sqlite3');
const database = new Database('movies.db');

const query = (`
SELECT SUBSTR(movies.title, 1, 1) AS starting_letter, AVG(ratings.rating) AS average_rating
FROM movies
JOIN ratings ON movies.id = ratings.movie_id
WHERE SUBSTR(movies.title, 1, 1) GLOB '[A-Z]'
GROUP BY starting_letter
ORDER BY starting_letter;
`);

const statement = database.prepare(query);
const results = statement.all();

if (results.length === 0) {
    console.log("No results found.");
} else {
    console.log("Starting Letter | Average Rating");
    console.log("-------------------------------");
    for (const row of results) {
        console.log(`      ${row.starting_letter}        |    ${row.average_rating.toFixed(2)}`);
    }
}

//Do starting letters correlate with the average movie rating? 
//List movie title starting letters and an average rating associated with them. 
//Ignore non-Latin and non-uppercase letters.