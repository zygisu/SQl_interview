const Database = require('better-sqlite3');
const db = new Database('movies.db');
const names = db.prepare("SELECT name FROM people WHERE name Like 'Quentin %' AND name !='Quentin Tarantino'").all();
console.log(names);
db.close();

//List all the people with the first name "Quentin", but who are not "Quentin Tarantino". 
//You can assume that names start with a first name.
