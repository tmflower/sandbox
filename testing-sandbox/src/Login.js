import axios from "axios";
import { useState } from "react";

export function Login() {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({ username: '', password: ''});
    const { username, password } = formData;

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(formData => ({ ...formData, [name]: value}));
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            await axios.post(`http://localhost:3001/login`, { username, password });
            setMessage("Login successful!");
        }
        catch(err) {
            console.error(err);
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form>
                <label htmlFor="username">Username:
                <input 
                    type="text" 
                    name="username" 
                    value={username} 
                    id="username" 
                    onChange={handleChange}>
                </input>
                </label>
                <label htmlFor="password">Password:
                <input 
                    type="password"
                    name="password" 
                    value={password} 
                    id="password" 
                    onChange={handleChange}>
                </input>
                </label>
                <button onClick={handleSubmit}>Submit</button> 
            </form>
            <p>{message}</p>
        </div>
    )
}