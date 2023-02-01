const db = require("./db");

class User {
    static async signup(username, password) {
        const result = await db.query(`
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING username, password`,
        [username, password]);
        console.log("RESULT ROWS[0] ", result.rows[0])
        return result.rows[0];
    }
}

module.exports = User;