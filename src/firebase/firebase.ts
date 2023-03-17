import { getDoc, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { newNoteData } from "../context/data";

const firebaseGET = async (db, userId) => {
    const cloudData = await getDoc(doc(db,"Users", userId));
    if (cloudData.exists()) {
        return await cloudData.data();
    }
}

// const firebaseGET = async (db, userId) => {
//     // const cloudData = await getDoc(doc(db,"Users", userId));
//     // if (cloudData.exists()) {
//     //     return cloudData.data();
//     // }
// }


const firebaseUPDATE = async (db, userId) => {
    const cloudData = doc(db, "Users", userId);
    await updateDoc(cloudData, {
        guest: "whoa"
    });

}

const firebasePOST = (db, userId) => {


    return "";
}

const firebaseNEW = (db, userId) => {
    setDoc(doc(db,"Users",String(userId)), {
        noteData: newNoteData,
        probabilityPool: 0,
        defaultGameSettings: { keyset: "treble", gameType: {type: 'limitless', action:null}, optionAmount:4, cardType: "all", inputType: "mouse-click" },
        gameSettings: { keyset: "treble", gameType: {type: 'limitless', action:null}, optionAmount:4, cardType: "all", inputType: "mouse-click" },
        guest: false
    });
}

// const figureItOut = async () => {
//     deleteDoc(doc(db,"Users","new"));
//     setDoc(doc(db,"Users","new"), {name:"help",age:"help"});
//     getDoc(doc(db,"Users","new"));
//     const aim = await getDoc(doc(db,"Users","new"))
//     if (aim.exists()){}
// }

export { firebaseGET, firebasePOST, firebaseNEW, firebaseUPDATE };