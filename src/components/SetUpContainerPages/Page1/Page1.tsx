import FlashcardGame from "../../../classes/FlashcardGame";
import { useContextData } from "../../../context/context";
import "./css/Page1.css";

export default function SetUpPage1() {
    const contextData = useContextData(); 

    const setKeysetInfo = (keyset: "treble" | "bass" | "upperTreble" | "lowest" | "highest") => {
        const keysetArray = FlashcardGame.noteRange(keyset);
        const maxScore = 10.3 * keysetArray.length; //10.3 is worse possible score
        const minScore = 1.9 * keysetArray.length;  //1.9 is score given with 85% accuracy and an average time of 1.2 seconds

        let avAccAddUp = 0;    //max:6.6  min:0.3
        let avTimeAddUp = 0;   //max:3.6  1s:0.7  .5s:0.4
        let avScoreAddUp = 0   //min1s:1  max:10.2

        for (let i = 0; i < keysetArray.length; i++) {
            avAccAddUp += (contextData.contextState.noteData[keysetArray[i]].acc / contextData.contextState.noteData[keysetArray[i]].dataSize)
            avTimeAddUp += contextData.contextState.noteData[keysetArray[i]].avgTime;
            avScoreAddUp += contextData.contextState.noteData[keysetArray[i]].score;
        }

        avAccAddUp = Math.ceil((avAccAddUp / keysetArray.length) * 100);
        avTimeAddUp = Number((avTimeAddUp / keysetArray.length).toFixed(1));

        //avAcc 1 = 85%    avTime 0.9 = 1.2s    avScore = 1.9    maxScore = 10.3
        let avScorePercentage = Math.ceil((avScoreAddUp - minScore) / (maxScore - minScore) * 100);
        avScorePercentage = avScorePercentage > 100 ? 100 : avScorePercentage;
    }

    return (
        <div className="keySetBtnContainer">
            <button className="keySetBtn" onClick={()=>{setKeysetInfo("treble")}}>Treble</button>
            <button className="keySetBtn" onClick={()=>{setKeysetInfo("bass")}}>Bass</button>
            <button className="keySetBtn" onClick={()=>{setKeysetInfo("upperTreble")}}>Upper Treble</button>
            <button className="keySetBtn" onClick={()=>{setKeysetInfo("lowest")}}>Lowest</button>
            <button className="keySetBtn" onClick={()=>{setKeysetInfo("highest")}}>Highest</button>
        </div>
    )
}