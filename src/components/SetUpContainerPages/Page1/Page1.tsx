import FlashcardGame from "../../../classes/FlashcardGame";
import { useContextData } from "../../../context/context";
import { iKeysetScoreInfo, iSingleNoteData } from "../../../interfaces/interfaces";
import "./css/Page1.css";

interface Props {
    onNoteInfoChange: Function;
    pageNav: Function;
}

export default function SetUpPage1({onNoteInfoChange, pageNav}: Props) {
    const contextData = useContextData(); 

    const setKeysetInfo = (keyset: "treble" | "bass" | "upperTreble" | "lowest" | "highest") => {
        const keysetArray = FlashcardGame.noteRange(keyset);
        const maxScore = 10.3 * keysetArray.length; //10.3 is worse possible score
        const minScore = 1.9 * keysetArray.length;  //1.9 is score given with 85% accuracy and an average time of 1.2 seconds

        let avgAccAddUp = 0, avgTimeAddUp = 0, avgScoreAddUp = 0;    //Acc: max:6.6|min:0.3  Time:max:3.6|1s:0.7|.5s:0.4  Score:min1s:1|max:10.2
        let noteByScore: iSingleNoteData[] = [];

        for (let i = 0; i < keysetArray.length; i++) {
            if (contextData.contextState.noteData[keysetArray[i]].dataSize >= 1) {
                avgAccAddUp += (contextData.contextState.noteData[keysetArray[i]].acc / contextData.contextState.noteData[keysetArray[i]].dataSize)
                avgTimeAddUp += contextData.contextState.noteData[keysetArray[i]].avgTime;
                avgScoreAddUp += contextData.contextState.noteData[keysetArray[i]].score;
                
                noteByScore.push({
                    note: contextData.contextState.noteData[keysetArray[i]].note,
                    acc:Math.ceil((contextData.contextState.noteData[keysetArray[i]].acc / contextData.contextState.noteData[keysetArray[i]].dataSize) * 100),
                    avgTime: contextData.contextState.noteData[keysetArray[i]].avgTime,
                    score: contextData.contextState.noteData[keysetArray[i]].score
                });
            }
            else {
                onNoteInfoChange({masteryLvl: 0, avgAccuracy: 0, avgTime: 0, orderByScore: []});
                pageNav("forward");
                return;
            }
        }

        avgAccAddUp = Math.ceil((avgAccAddUp / keysetArray.length) * 100);
        avgTimeAddUp = Number((avgTimeAddUp / keysetArray.length).toFixed(1));
        
        let avgScorePercentage = Math.ceil((avgScoreAddUp - minScore) / (maxScore - minScore) * 100);
        avgScorePercentage = avgScorePercentage > 100 ? 100 : avgScorePercentage;
        noteByScore.sort((a, b) => a.score - b.score);

        const keysetInfo: iKeysetScoreInfo = {
            masteryLvl: avgScorePercentage,
            avgAccuracy: avgAccAddUp,
            avgTime: avgTimeAddUp,
            orderByScore: noteByScore,
        };
        
        onNoteInfoChange(keysetInfo);
        pageNav("forward");
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