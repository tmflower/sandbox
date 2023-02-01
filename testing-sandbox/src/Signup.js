import { useState } from "react";

export function Signup() {
    const [formData, setFormData] = useState({ username: '', password: ''});
    const { username, password } = formData;

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(formData => ({ ...formData, [name]: value}));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const newUser = { username, password }
    }
    return (
        <div>
            <h1>Sign up</h1>
            <form>

            </form>
        </div>
    )
}