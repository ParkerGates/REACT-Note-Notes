import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './views/home';
import Setup from './views/setup';
import Flashcards from './views/flashcards';
import Review from './views/review';
import About from './views/about';
import Profile from './views/profile';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav className="displayFlexCenter">
        <div className="displayInlineBlock">
          <Link to="/">Home</Link>
          <Link to="setup">Setup</Link>
          <Link to="flashcards">Flashcards</Link>
          <Link to="review">Review</Link>
          <Link to="about">About</Link>
          <Link to="profile">Profile</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/review" element={<Review />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;