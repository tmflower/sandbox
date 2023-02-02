import axios from "axios";

export function Todo({ todo }) {

    async function selectTask() {
        await axios.get(`http://localhost:3001/todos/${todo.todo_id}`);
    }

    async function deleteTask() {
        await axios.delete(`http://localhost:3001/todos/${todo.todo_id}`);
    }

    return (
        <div>
            <p onClick={selectTask}><span onClick={deleteTask}>🗑️</span> {todo.task}</p>
        </div>
    )
}