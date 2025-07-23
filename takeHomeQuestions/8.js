const Database = require('better-sqlite3');
const database = new Database('movies.db');

const query = (`
SELECT movies.title, ratings.rating, people.name AS star_name
FROM movies
JOIN ratings ON movies.id = ratings.movie_id
JOIN stars ON movies.id = stars.movie_id
JOIN people ON stars.person_id = people.id
WHERE ratings.rating > 8.5 AND people.birth > 2005
ORDER BY ratings.rating DESC;
`);

const statement = database.prepare(query);
const results = statement.all();

for (const row of results) {
    console.log('Title:', row.title, 'Rating:', row.rating, 'Star:', row.star_name);
}

//List all the movies rated above 8.5 that feature a star born after 2005. 
//Order the list by the movie's rating in descending order. 
//You should return the movie title, rating, and the star's name. 
//A movie can have multiple stars, which means that a movie can appear multiple times in the result set.