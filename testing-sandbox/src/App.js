import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import { Signup } from './Signup';
import { Todos } from './Todos';
import { Navbar } from './Navbar';

export function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Todos />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/todos" element={<Todos />}></Route>
      </Routes>
    </div>
  );
}
