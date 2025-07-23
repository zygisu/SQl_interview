const Database = require('better-sqlite3');
const db = new Database('movies.db');

const rows = db.prepare(`
    SELECT people.name, COUNT(stars.movie_id) AS movie_count
    FROM stars
    JOIN people ON stars.person_id = people.id
    GROUP BY people.id
    HAVING movie_count >= 300
    ORDER BY movie_count DESC
`).all();

for (let i = 0; i < rows.length; i++) {
    console.log(rows[i].name + ': ' + rows[i].movie_count);
}

db.close();

//List star names and the number of movies they have appeared in (acted). 
//List only the stars that have appeared in at least 300 movies.