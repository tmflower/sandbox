import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { Login } from './Login';
import { Signup } from './Signup';
import { Todo } from './Todo';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
