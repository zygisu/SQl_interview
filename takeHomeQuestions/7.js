const Database = require('better-sqlite3');
const db = new Database('movies.db');

const rows = db.prepare(`
    SELECT movies.title FROM movies
    JOIN stars ON movies.id = stars.movie_id
    JOIN people ON stars.person_id = people.id
    WHERE people.name IN ('Bradley Cooper', 'Jennifer Lawrence')
    GROUP BY movies.id
    HAVING COUNT(DISTINCT people.name) = 2
`).all();

for (let i = 0; i < rows.length; i++) {console.log(rows[i].title);}
db.close();



//Write a query that lists all movie titles where Scarlett Johansson and Chris Evans starred together.