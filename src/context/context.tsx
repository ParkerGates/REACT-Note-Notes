import React, { useReducer } from 'react';
import { useContext } from 'react';
import { initialState, reducer } from './reducer';

interface Props {
    children: JSX.Element;
}

const ScoreContext = React.createContext<any>({});
export {ScoreContext}

export function useScore() {
    return useContext(ScoreContext);
}

export default function AppContext(props: Props) {
    const [noteScore, dispatch] = useReducer(reducer, initialState);

    return(
        <ScoreContext.Provider value={{scoreState: noteScore, scoreDispatch: dispatch}}>
            {props.children}
        </ScoreContext.Provider>
    );
}