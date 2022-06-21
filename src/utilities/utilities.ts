import { iNoteData } from "../interfaces/interfaces";

const clamp = (num, min, max): number => Math.min(Math.max(num, min), max);


const calcAccuracyScore = (accuracy, datasize): number => { //max:6.6  min:0.3
    let accScore: number = Number((((10 - ((accuracy / datasize) * 10)) / 2) * 1.4 ).toFixed(1));
    
    //Wait till dataset is 10 before slimming calculations
    accScore = datasize < 10 ? 4 : accScore;
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


export { clamp, calcAccuracyScore, calcTimeScore, shuffle, getTroubleNoteRange }