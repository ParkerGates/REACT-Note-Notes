import React, { useEffect, useReducer } from 'react';
import { useContext } from 'react';
import { initialState, reducer } from './reducer';
import { firebaseGET } from '../firebase/firebase';

import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore} from "firebase/firestore";
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore'
import 'firebase/compat/auth';

interface Props {
    children: JSX.Element;
}


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


const FirestoreData = React.createContext<any>({});
export function useFirestoreData() { return useContext(FirestoreData); }
export { FirestoreData }

const ContextData = React.createContext<any>({});
export function useContextData() { return useContext(ContextData); }
export { ContextData }


export default function AppContext(props: Props) {
    const [user] = useAuthState(auth);
    const [noteScore, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
            if (user !== null && user.uid !== null) {
                const fetchCloudData = async () => {
                    dispatch({
                        type:"new-state",
                        newState: await firebaseGET(db, user.uid),
                    });
                }
                fetchCloudData();
            }

    }, [user]);


    return(
        <ContextData.Provider value={{contextState: noteScore, contextDispatch: dispatch}}>
            <FirestoreData.Provider value={{auth: auth, db: db, user: user}}>
                {props.children}
            </FirestoreData.Provider>
        </ContextData.Provider>
    );
}