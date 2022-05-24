import React, { useReducer } from 'react';
import { useContext } from 'react';
import noteData from './data'

interface Props {
    children: JSX.Element;
}

//Context
const ScoreContext = React.createContext<any>({});
export {ScoreContext}

export function useScore() {
    return useContext(ScoreContext);
}

const initialState = {
    probabilityPool: 0,
    noteData: noteData
};

const reducer = (state:any , action:any) => {
    switch(action.type) {
        case "test1":
            console.log(state)
            return {...state, probabilityPool: 5}
        
        case "reset":
            return initialState;
        default:
            return state;
    }
}

export default function AppContext(props: Props) {
    const [noteScore, dispatch] = useReducer(reducer, initialState);

    return(
        <ScoreContext.Provider value={{scoreState: noteScore, scoreDispatch: dispatch}}>
            {props.children}
        </ScoreContext.Provider>
    );
}