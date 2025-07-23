const Database = require('better-sqlite3');
const db = new Database('movies.db');

const rows = db.prepare(`
    SELECT movies.title, movies.year
    FROM movies
    JOIN directors ON movies.id = directors.movie_id
    JOIN people ON directors.person_id = people.id
    WHERE people.name = 'Frank Darabont'
    ORDER BY movies.year DESC
`).all();

for (let i = 0; i < rows.length; i++) {
    console.log(rows[i].title + ' (' + rows[i].year + ')');}
db.close();


//List all the movies directed by Frank Darabont and their release years. 
//Order the results by the movie's release year in descending order.