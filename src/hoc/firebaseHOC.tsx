import React from "react";
import firebase from "firebase/compat/app";
import { useContextData, useFirestoreData } from "../context/context";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const withFireBase = WrappedComponent => {
    function Firebase(props) {
        let fsd = useFirestoreData();
        let context = useContextData();

        const signInWithGoogle = async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            fsd.auth.signInWithPopup(provider)
                .then((res) => {
                    // console.log(res.additionalUserInfo.isNewUser);
                    // console.log(res.user.uid);
        
                    if (res.additionalUserInfo.isNewUser === true) {
                        setDoc(doc(fsd.db,"Users",String(res.user.uid)), {
                            name:"helppp",
                            age:"help"
                        });
                    }
        
                })
                .catch((err) => {console.log("errorrrrr")});
        }

        const signInAsGuest = () => {
            console.log("hi");
            context.contextDispatch({type:"guestSignInToggle"});
        }


        const signOut = () => {
            fsd.auth.signOut();
        }

        return(
            <WrappedComponent 
                signIn={signInWithGoogle}
                signOut={signOut}
                signInAsGuest={signInAsGuest}
                {...props}
            />
        );
    }
    return Firebase
}

export default withFireBase;