const { Client } = require("pg");

function getDatabaseUri() {
    if (process.env.NODE_ENV === "test") {
      return "test_testing_sandbox";
    }    
    return "testing_sandbox";
}

let  db = new Client({
    connectionString: getDatabaseUri()
  });

db.connect();

module.exports = db;