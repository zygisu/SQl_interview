const Database = require('better-sqlite3');
const db = new Database('movies.db');

// Query all movies
const rows = db.prepare('SELECT COUNT(*) AS count FROM movies').all();
console.log(rows);

db.close();



//node index.js to run this sql