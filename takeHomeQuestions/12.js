const Database = require('better-sqlite3');
const database = new Database('movies.db');

const [,, title, year] = process.argv;

if (!title || !year) {
    console.error('Usage: node add-movie-cli.js "<Movie Title>" <Year>');
    process.exit(1);
}
if (!/^\d+$/.test(year)) {
    console.error('Error: Year must be numeric.');
    process.exit(1);
}

let transaction;
try {
    transaction = database.transaction(() => {
        const checkStmt = database.prepare(
            'SELECT id FROM movies WHERE title = ? AND year = ?'
        );
        const existing = checkStmt.get(title, year);

        if (existing) {
            throw new Error('A movie with the same title and year already exists in the database.');
        }

        const insertStmt = database.prepare(
            'INSERT INTO movies (title, year) VALUES (?, ?)'
        );
        const result = insertStmt.run(title, year);

        console.log(`New movie added with ID: ${result.lastInsertRowid}`);
    });

    transaction();
} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
}





//Write a Node.js script that takes a movie title and year as a command-line argument. 
//Print an error message if a movie with the same title and year already exists in the database. 
//If it does not exist, add it to the database. Assert that a year is numeric. Use query parameters. 
//If any query fails, roll back your changes. If all queries succeed, commit your changes and print the new movie ID to the console.