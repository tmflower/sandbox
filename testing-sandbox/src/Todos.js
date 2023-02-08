import { useState } from "react";
import axios from "axios";
import { Todo } from "./Todo";

export function Todos({todos}) {

    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({ task: ''});
    const { task } = formData;

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(formData => ({ ...formData, [name]: value}));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            await axios.post(`http://localhost:3001/todo`, { task });
            setMessage("Task added!");
            setFormData({task: ''})
        }
        catch(err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Todos</h1>
            <h4>Add a new task</h4>
            <form>
                <label htmlFor="task">Task:
                <input 
                    type="text" 
                    name="task" 
                    value={task} 
                    id="task" 
                    onChange={handleChange}>
                </input>
                </label>
                <button onClick={handleSubmit}>Submit</button> 
            </form>
            <p>{message}</p>
            {!todos.length ? <p>No tasks yet. Add a new task above.</p> 
            :
            <ul>
                {todos.map((todo, i) => <li key={i} style={{listStyleType:'none'}}><Todo key={i} todo={todo}/></li>)}
            </ul>
            }
        </div>
    )
}