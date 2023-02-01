const { Client } = require("pg");

function getDatabaseUri() {
    return "testing_sandbox";
}

let  db = new Client({
    connectionString: getDatabaseUri()
  });

db.connect();

module.exports = db;