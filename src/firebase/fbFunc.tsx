import firebase from "firebase/compat/app";
import { doc, setDoc } from "firebase/firestore";
import { useFirestoreData } from "../context/context";

interface Props {
    styling?: string;
    children: string;
}

export default function SignIn({styling, children}: Props) {
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
    return(
        <button onClick={signInWithGoogle} className={styling}>
            {children}
        </button>
    );
}