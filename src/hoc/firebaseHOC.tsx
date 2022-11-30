import React from "react";
import firebase from "firebase/compat/app";
import { useFirestoreData } from "../context/context";
import { doc, setDoc } from "firebase/firestore";

const withFireBase = WrappedComponent => {
    function Firebase(props) {
        let fsd = useFirestoreData();

        const signInWithGoogle = async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            fsd.auth.signInWithPopup(provider)
                .then((res) => {
                    console.log(res.additionalUserInfo.isNewUser);
                    console.log(res.user.uid);
        
                    if (res.additionalUserInfo.isNewUser === true) {
                        setDoc(doc(fsd.db,"Users",String(res.user.uid)), {
                            name:"helppp",
                            age:"help"
                        });
                    }
        
        
                })
                .catch((err) => {console.log("errorrrrr")});
        }

        const signOut = () => {
            fsd.auth.signOut();
        }

        return(
            <WrappedComponent 
                signIn={signInWithGoogle}
                signOut={signOut}
                {...props}
            />
        );
    }
    return Firebase
}

export default withFireBase;