import React from "react";
import firebase from "firebase/compat/app";
import { ContextData, useContextData, useFirestoreData } from "../context/context";
import { firebaseNEW, firebaseRESET } from "../firebase/firebase";

const withFireBase = WrappedComponent => {
    function Firebase(props) {
        let fsd = useFirestoreData();
        let context = useContextData();

        const signInWithGoogle = async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            fsd.auth.signInWithPopup(provider)
                .then((res) => {
                    if (res.additionalUserInfo.isNewUser === true) {
                        firebaseNEW(fsd.db, res.user.uid);
                    }
                })
                .catch((err) => {});
        }

        const signInAsGuest = () => {
            context.contextDispatch({type:"guestSignInToggle"});
        }


        const signOut = () => {
            context.contextDispatch({type:"reset"});
            fsd.auth.signOut();
        }

        const resetAccount = () => {
            if (fsd.user) {
                firebaseRESET(fsd.db, fsd.user.uid);
            }
            context.contextDispatch({type:"reset"});
        }

        const deleteAccount = () => {
            if (fsd.user) {
                firebaseRESET(fsd.db, fsd.user.uid);
            }
            context.contextDispatch({type:"reset"});
            fsd.auth.signOut();
        }

        return(
            <WrappedComponent 
                signIn={signInWithGoogle}
                signOut={signOut}
                signInAsGuest={signInAsGuest}
                resetAccount={resetAccount}
                deleteAccount={deleteAccount}
                {...props}
            />
        );
    }
    return Firebase
}

export default withFireBase;