import axios from "axios";
import { useState } from "react";

export function Todo({ todo }) {
    const [message, setMessage] = useState(null);

    async function selectTask() {
        await axios.get(`http://localhost:3001/todos/${todo.todo_id}`);
    }

    async function deleteTask() {
        await axios.delete(`http://localhost:3001/todos/${todo.todo_id}`);
        setMessage("Task deleted")
    }

    return (
        <div>
            <p onClick={selectTask}><span onClick={deleteTask}>🗑️</span> {todo.task}</p>
            {message ? <p>{message}</p> : null}
        </div>
    )
}