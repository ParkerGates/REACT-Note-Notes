import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AuthGuard from './routing/AuthGuard';
import Home from './views/home';
import Setup from './views/setup';
import Flashcards from './views/flashcards';
import Review from './views/review';
import About from './views/about';
import Profile from './views/profile';
import Reloads from './views/reloads';
import NavBar from './components/NavBar/NavBar';
import Showcase from './views/showcase';

import {getFirestore,collection,getDoc,doc,setDoc,deleteDoc} from "firebase/firestore";
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore'
import 'firebase/compat/auth';

import './App.css';

const app = firebase.initializeApp({
	apiKey: "AIzaSyDclldB4PxY91iPbx-cG_A4iNTQvCWDXbk",
	authDomain: "testingfirebase-eece3.firebaseapp.com",
	projectId: "testingfirebase-eece3",
	storageBucket: "testingfirebase-eece3.appspot.com",
	messagingSenderId: "269467348339",
	appId: "1:269467348339:web:90ac2f0ed27c6ab783e906",
	measurementId: "G-GHZJVVWL0F"
});

const auth: any = firebase.auth();
const firestore = firebase.firestore();
const db = getFirestore();

function App() {
  
  return (
    <BrowserRouter>
      <div className="AppContainer">
        <div className="border1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/review" element={<Review />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/setup" element={
              <AuthGuard>
                <Setup />  
              </AuthGuard>
            } />
            <Route path="/flashcards" element={
              <AuthGuard>
                <Flashcards />
              </AuthGuard>
            } />
            {/* <Route path="/profile" element={
              <AuthGuard>
                <Profile />
              </AuthGuard>
            } /> */}
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