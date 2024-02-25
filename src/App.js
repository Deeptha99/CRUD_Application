import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Create from './Create';
import View from './View';
import Update from './Update';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/create" element={<Create />}></Route>
      <Route path="/view/:id" element={<View />}></Route>
      <Route path="/edit/:id" element={<Update />}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
