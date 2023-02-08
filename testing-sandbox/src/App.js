import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import { Signup } from './Signup';
import { Todos } from './Todos';
import { Navbar } from './Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
      async function getTodos() {
          const result = await axios.get(`http://localhost:3001/todos`);
          setTodos(result.data);
      }
      getTodos();
  }, [todos]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Todos todos={todos}/>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/todos" element={<Todos todos={todos}/>}></Route>
      </Routes>
    </div>
  );
}
