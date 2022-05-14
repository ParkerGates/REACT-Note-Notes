import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './views/home';
import Setup from './views/setup';
import Flashcards from './views/flashcards';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="setup">Setup</Link>
        <Link to="flashcards">Flashcards</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/setup" element={<Setup />}></Route>
        <Route path="/flashcards" element={<Flashcards />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function View1() {
  return(
    <div>View1</div>
  );
}

function View2() {
  return(
    <div>View2</div>
  );
}

function View3() {
  return(
    <div>View3</div>
  );
}
