import { iKeysetScoreInfo, iNoteData, iSingleNoteData } from "../interfaces/interfaces";
import FlashcardGame from "../classes/FlashcardGame";

const clamp = (num, min, max): number => Math.min(Math.max(num, min), max);


const calcAccuracyScore = (accuracy, datasize): number => { //max:6.6  min:0.3
    //Equation: (10 - ((acc / ds) * 10)  /  2  * 1.4
    let accScore: number = Number((((10 - ((accuracy / datasize) * 10)) / 2) * 1.4 ).toFixed(1));

    //Wait till dataset is 5 before slimming calculations
    accScore = datasize < 5 ? 4 : accScore;
    return accScore;
}


const calcTimeScore = (avgTime: number): number => { //max:3.6  1s:0.7  .5s:0.4
    let timeScore: number = Number((avgTime / 1.4).toFixed(1));
    return timeScore;
}


const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}


//Returns an array[strings] with the 8 worst scored notes
const getTroubleNoteRange = (normalRange: string[], noteData: iNoteData): string[] => {
    const troubleKeyset: string[] = []
    let notesByScore: {note: string,score:number}[] = []
    let isDataSizeBigEnough: boolean = true;

    normalRange.forEach((item, index)=> {
        notesByScore.push({note:normalRange[index], score:noteData[normalRange[index]].score})
        if (noteData[normalRange[index]].dataSize <= 1) {isDataSizeBigEnough = false};
    });

    notesByScore.sort((a, b) => a.score - b.score);

    const troubleAmount = Math.floor((notesByScore.length/4)*3) > 6 ? Math.floor((notesByScore.length/4)*3) : 6;
    notesByScore = notesByScore.slice(notesByScore.length - troubleAmount, notesByScore.length);

    notesByScore.forEach((item) => troubleKeyset.push(item.note));
    return isDataSizeBigEnough === true ? troubleKeyset : normalRange;
}

const getKeysetProgress = (context:any, keyset:"treble"|"bass") => {
    const keysetArray = FlashcardGame.noteRange(keyset,"all",context.contextState.noteData);

    const maxScore = 10.3 * keysetArray.length; //10.3 is worse possible score
    const minScore = 1.9 * keysetArray.length;  //1.9 is score given with 85% accuracy and an average time of 1.2 seconds

    let avgScoreAddUp = 0;

    for (let i = 0; i < keysetArray.length; i++) {
        if (context.contextState.noteData[keysetArray[i]].dataSize >= 1) {
            avgScoreAddUp += context.contextState.noteData[keysetArray[i]].score;
        }
        else {
            // {masteryLvl: 0, avgAccuracy: 0, avgTime: 0, orderByScore: []}
            return 0;
        }
    }

    let avgScorePercentage = Math.ceil((avgScoreAddUp - minScore) / (maxScore - minScore) * 100);
    avgScorePercentage = avgScorePercentage > 100 ? 100 : avgScorePercentage;

    return (100 - avgScorePercentage);
}


export { clamp, calcAccuracyScore, calcTimeScore, shuffle, getTroubleNoteRange, getKeysetProgress }