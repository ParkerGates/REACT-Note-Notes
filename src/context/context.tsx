import React from 'react';
import { useState, useContext } from 'react';

const ScoreContext = React.createContext("");

export function useScore() {
    return useContext(ScoreContext);
}

export default function AppContext() {
    const [score, setScore] = useState("yee");

    return(
        ""
    );
}