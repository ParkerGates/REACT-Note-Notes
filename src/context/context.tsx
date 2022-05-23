import React, { useReducer } from 'react';
import { useContext } from 'react';
import noteData from './data'

interface Props {
    children: JSX.Element;
}

//Context
const ScoreContext = React.createContext("");

//Context for Class Components
const ScoreConsumer = ScoreContext.Consumer;
export {ScoreContext, ScoreConsumer}

export function useScore() {
    return useContext(ScoreContext);
}

const initialState = noteData;

const reducer = (state:any , action:any) => {
    switch(action.type) {
        case "test1":
            return state;
        case "test2":
            return state;
        case "reset":
            return initialState;
        default:
            return state;
    }
}

export default function AppContext(props: Props) {
    const [noteScore, dispatch] = useReducer(reducer, initialState);

    return(
        <ScoreContext.Provider value={"a"}>
            {props.children}
        </ScoreContext.Provider>
    );
}