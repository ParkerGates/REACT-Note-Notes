import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './views/home';
import Setup from './views/setup';
import Flashcards from './views/flashcards';
import Review from './views/review';
import About from './views/about';
import Profile from './views/profile';
import Reloads from './views/reloads';
import NavBar from './components/NavBar/NavBar';
import Showcase from './views/showcase';
import './App.css';

function App() {
  
  return (
    <BrowserRouter>
      <div className="AppContainer">
        <div className="border1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/review" element={<Review />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reloads/:location" element={<Reloads />} />
          </Routes>
        </div>

        <NavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;