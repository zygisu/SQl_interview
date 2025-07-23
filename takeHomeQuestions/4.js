const Database = require('better-sqlite3');
const db = new Database('movies.db');

const row = db.prepare(
  "SELECT COUNT(*) AS count FROM directors WHERE person_id = (SELECT id FROM people WHERE name = 'Martin Scorsese')"
).get();

console.log('Martin Scorsese director count:', row.count);
db.close();

//Count all the times that Martin Scorsese directed.



