import React, { useReducer } from 'react';
import { useContext } from 'react';
import { initialState, reducer } from './reducer';

interface Props {
    children: JSX.Element;
}

const ContextData = React.createContext<any>({});
export { ContextData }

export function useContextData() {
    return useContext(ContextData);
}

export default function AppContext(props: Props) {
    const [noteScore, dispatch] = useReducer(reducer, initialState);

    return(
        <ContextData.Provider value={{contextState: noteScore, contextDispatch: dispatch}}>
            {props.children}
        </ContextData.Provider>
    );
}