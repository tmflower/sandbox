import { useState } from "react";
import axios from "axios";

export function Signup() {
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
            await axios.post(`http://localhost:3001/signup`, { username, password });
            setMessage("Signup successful!");            
        }
        catch(err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h1>Sign up</h1>
            <form>
                <label htmlFor="username">Username:
                <input 
                    type="text" 
                    name="username" 
                    value={username} 
                    id="username" 
                    placeholder="username"
                    onChange={handleChange}>
                </input>
                </label>
                <label htmlFor="password">Password:
                <input 
                    type="password"
                    name="password" 
                    value={password} 
                    id="password" 
                    placeholder="password"
                    onChange={handleChange}>
                </input>
                </label>
                <button onClick={handleSubmit}>Submit</button> 
            </form>
            {message ? <p data-testid="message">{message}</p> : null}
            
        </div>
    )
}