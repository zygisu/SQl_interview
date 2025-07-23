const Database = require('better-sqlite3');
const db = new Database('movies.db');

const row = db.prepare('SELECT COUNT(*) AS count FROM movies WHERE year > 2004 AND year < 2016').get();
console.log('Movies released between 2005 and 2015:', row.count);


//Count all movie titles released between 2005 and 2015.
