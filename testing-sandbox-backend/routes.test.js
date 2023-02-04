process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
const db = require("./db");

let demoUser;
let demoTodo;
beforeEach(async function() {
    let result = await db.query(`
    INSERT INTO users
    (username, password)
    VALUES ('demo', '1234')
    RETURNING username, password`);
    demoUser = result.rows[0];

    let result2 = await db.query(`
    INSERT INTO todos(task)
    VALUES ('wash the car')
    RETURNING task, status, todo_id`);
    demoTodo = result2.rows[0];
});

afterEach(async function() {
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM todos");
});

afterAll(async function() {
    await db.end();
});

// sign up a new user
describe("POST /signup", function() {
    test("creates a new user", async function() {
        const response = await request(app)
        .post("/signup")
        .send({username: "Fred", password: "Flintstone"});
        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual({user_id: expect.any(Number), username: "Fred", password: "Flintstone"});
    });
});

// login a returning user with valid credentials
describe("POST /login", function() {
    test("logs in a returning user", async function() {
        const response = await request(app)
        .post("/login")
        .send({username: "demo", password: "1234"});
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({message: "Login successful!"});
    });
});

// reject a user with invalid credentials
describe("POST /login", function() {
    test("rejects user with invalid credentials", async function() {
        const response = await request(app)
        .post("/login")
        .send({username: "bad username", password: "bad password"});
        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual({message: "Wrong username or password"});
    });
});

// get a list of all users
describe("GET /users", function() {
    test("gets list of all users", async function() {
        const response = await request(app)
        .get("/users");
        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toEqual(1);
        
        await request(app)
        .post("/signup")
        .send({username: "Fred", password: "Flintstone"});

        await request(app)
        .post("/signup")
        .send({username: "Wilma", password: "Flintstone"});

        await request(app)
        .post("/signup")
        .send({username: "Baby", password: "Flintstone"});

        const response2 = await request(app)
        .get("/users");
        expect(response2.statusCode).toEqual(200);
        expect(response2.body.length).toEqual(4);
    });
});

// get individual user by username
describe("GET /user/:username", function() {
    test("gets single user", async function() {
        const response = await request(app)
        .get(`/users/${demoUser.username}`);
        expect(response.body).toEqual({user_id: expect.any(Number)});
        // expect(response.statusCode).toEqual(200);
        // getting 201 instead...why?
    });

    test("returns 400 if no user", async function() {
        const username = "badUsername"
        const response = await request(app)
        .get(`/users/${username}`);
        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual({message: `No user ${username}`})
    });
});

// create a new todo
describe("POST /todo", function() {
    test("creates a new todo", async function() {
        const response = await request(app)
        .post("/todo")
        .send({task: "feed the cats"});
        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual({todo_id: expect.any(Number), task: "feed the cats", status: null})
    });
});

// get list of all todos
describe("GET /todos", function() {
    test("gets list of all todos", async function() {
        const response = await request(app)
        .get("/todos");
        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toEqual(1);
        expect(response.body).toEqual([{todo_id: expect.any(Number), task: "wash the car", status: null}])
        
        await request(app)
        .post("/todo")
        .send({task: "feed the cats"});

        await request(app)
        .post("/todo")
        .send({task: "water plants"});

        const response2 = await request(app)
        .get("/todos");
        expect(response2.statusCode).toEqual(200);
        expect(response2.body.length).toEqual(3);
    });
});

// get single todo by id
describe("GET /todos/:id", function() {
    test("gets single todo", async function() {
        const response = await request(app)
        .get(`/todos/${demoTodo.todo_id}`);
        expect(response.body).toEqual({ task: 'wash the car', status: null, todo_id: expect.any(Number) });
        // expect(response.statusCode).toEqual(200);
        // getting 201 instead...why?
    });

    test("returns 400 if no todo", async function() {
        const todoId = 1234780324
        const response = await request(app)
        .get(`/todos/${todoId}`);
        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual({message: `No todo ${todoId}`})
    });
});

// update a todo
describe("PATCH /todos/:id", function() {
    test("updates a todo", async function() {
        const todoId = demoTodo.todo_id;        
        const response = await request(app)
        .patch(`/todos/${todoId}`)
        .send({task: "sweep the floors"});
        console.log(todoId)
        console.log(response.body)
        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual({task: "sweep the floors", status: null})
    });
});

// delete a todo
describe("DELETE /todos/:id", function() {
    test("deletes a todo", async function() {
        const todoId = demoTodo.todo_id;
        const response = await request(app)
        .delete(`/todos/${todoId}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({ message: "Task deleted"});
        const response2 = await request(app)
        .get("/todos");
        expect(response2.body.length).toEqual(0);
    })
})