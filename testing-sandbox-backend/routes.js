const express = require("express");
const router = new express.Router();
const db = require("./db");

router.get("/home", async function (req, res) {
    const msg = "Welcome home!";
    return res.status(200).json({msg})
});

router.post("/signup", async function (req, res, next) { 
    try {
        const { username, password } = req.body;
        const result = await db.query(`
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING user_id, username, password`,
        [username, password]);
        return res.status(201).json(result.rows[0]);
    }
    catch(err) {
        return next(err);
    }
});

router.post("/login", async function (req, res, next) { 
    try {
        const { username, password } = req.body;
        const result = await db.query(`
        SELECT user_id, username, password
        FROM users
        WHERE username = $1 AND password = $2`,
        [username, password]);
        if (result.rows[0]) {
            return res.status(200).json({message: "Login successful!"});
        }
        else return res.status(400).json({message: "Wrong username or password"});
    }
    catch(err) {
        return next(err);
    }
});

router.get("/users", async function (req, res, next) {
    try {
        const result = await db.query(`
        SELECT user_id, username, password
        FROM users`);
        return res.status(200).json(result.rows);
    }
    catch (err) {
        return next (err);
    }
});

router.get("/users/:username", async function (req, res, next) { 
    try {
        const { username } = req.params;
        const result = await db.query(`
        SELECT user_id
        FROM users
        WHERE username = $1`,
        [username]);
        if (result.rows[0]){
            return res.status(201).json(result.rows[0]);
        }
        return res.status(400).json({message: `No user ${username}`})
    }
    catch(err) {
        return next(err);
    }
});

router.post("/todo", async function (req, res, next) { 
    try {
        const { task, status } = req.body;
        const result = await db.query(`
        INSERT INTO todos (task, status)
        VALUES ($1, $2)
        RETURNING todo_id, task, status`,
        [task, status]);
        return res.status(201).json(result.rows[0]);
    }
    catch(err) {
        return next(err);
    }
});

router.get("/todos", async function (req, res, next) {
    try {
        const result = await db.query(`
        SELECT todo_id, task, status
        FROM todos`);
        return res.status(200).json(result.rows);
    }
    catch (err) {
        return next (err);
    }
});

router.get("/todos/:id", async function (req, res, next) { 
    try {
        const { id } = req.params;
        const result = await db.query(`
        SELECT todo_id, task, status
        FROM todos
        WHERE todo_id = $1`,
        [id]);
        if (result.rows[0]){
            return res.status(201).json(result.rows[0]);
        }
        return res.status(400).json({message: `No todo ${id}`})
    }
    catch(err) {
        return next(err);
    }
});

router.patch("/todos/:id", async function (req, res, next) { 
    try {
        const { id } = req.params;
        const { task, status } = req.body;
        const result = await db.query(`
        UPDATE todos
        SET task = $1, status = $2
        WHERE todo_id=$3
        RETURNING task, status`,
        [task, status, id]);
        if (result.rows[0]){
            return res.status(201).json(result.rows[0]);
        }
        return res.status(400).json({message: `No todo ${id}`});
    }
    catch(err) {
        return next(err);
    }
});

router.delete("/todos/:id", async function (req, res, next) {
    try {
        const { id } = req.params;
        await db.query(`
        DELETE FROM todos
        WHERE todo_id = $1`,
        [id]);       
        return res.status(200).json({ message: "Task deleted"})
    }
    catch(err){
        return next(err)
    }
});

module.exports = router;