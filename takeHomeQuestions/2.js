const Database = require('better-sqlite3');
const db = new Database('movies.db');

const currentYear = new Date().getUTCFullYear();

const rows = db.prepare('SELECT name, birth FROM people WHERE birth IS NOT NULL ORDER BY birth ASC LIMIT 10;').all();

rows.forEach(function(row) {
  var name = row.name;
  var birth = row.birth;
  var yearsSinceBirth = currentYear - birth;
  console.log(name + ': ' + yearsSinceBirth + ' years');
});

db.close();



//Letters from a stoic. List the names of the 10 oldest people and how many years have passed since they were born in the current year. 
//Do not include people who do not have a birth year.