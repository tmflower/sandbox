import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import { Signup } from './Signup';
import { Todos } from './Todos';
import { Navbar } from './Navbar';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/todos" element={<Todos />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
