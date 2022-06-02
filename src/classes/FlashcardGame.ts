import { iNoteData, iSingleNoteData } from '../interfaces/interfaces';
import { allKeys } from '../context/data';
import { clamp } from "../utilities/utilities";
import shuffle from "../utilities/shuffleArray";
import TimeQueue from '../utilities/timeQueue';

export default class FlashcardGame {
    private keySetName:"treble" | "bass" | "upperTreble" | "lowest" | "highest";
    private keySetIndexRange: number[];
    private keySetNotes: string[];
    private allNotes = allKeys
    private probabilityNumber = 0;


    constructor(keySetName: "treble" | "bass" | "upperTreble" | "lowest" | "highest") {
        this.keySetName = keySetName;
        this.keySetIndexRange = this.noteRange(keySetName)
        this.keySetNotes = this.allNotes.slice(this.keySetIndexRange[0],this.keySetIndexRange[1] + 1)
    }


    public getNote = (iNoteData: iNoteData): any => {
        const chosenNote = this.findNoteFromRandom(iNoteData, this.randomProbability());

        const payload = {
            find: chosenNote,
            options: this.createOptionsArray(this.keySetNotes.indexOf(chosenNote))
        }
        return payload;
    }


    static updateNoteData(note: string, correct: boolean, time: number, prior: iSingleNoteData) {
        const updatedNoteData: iSingleNoteData = {
            note: note,
            acc: correct === true ? clamp(prior.acc + 1, 1, 19) : clamp(prior.acc - 1, 1, 19),
            dataSize: prior.dataSize >= 20 ? 20 : prior.dataSize + 1,
            time: TimeQueue.enqueue(prior.time, time),
            avgTime: 0,
            score: 0
        }
        updatedNoteData.avgTime = Number(TimeQueue.timeAverage(updatedNoteData.time).toFixed(1));

        //Calc Accuracy & Time Score
        let accScore = Number( (Math.sqrt((100 - ((updatedNoteData.acc / updatedNoteData.dataSize) * 100))) / 2).toFixed(1));
        accScore = updatedNoteData.dataSize < 10 ? 4 : accScore;    //Wait till dataset is 10 before slimming calculations

        const timeScore = Number((updatedNoteData.avgTime / 2).toFixed(1));
        
        updatedNoteData.score = accScore + timeScore;
        return updatedNoteData;
    }




    //Setup Methods
    //==================================================================
    private createOptionsArray(selectedIndex: number): string[] {
        const optionAmount = 5;
        const randomOffset = Math.floor(Math.random() * optionAmount) + 1
        let maxIndex = selectedIndex + randomOffset;
        let minIndex = selectedIndex - (5 - randomOffset);

        if (minIndex < 0) {
            maxIndex = optionAmount
            minIndex = 0;
        }
        else if (maxIndex > this.keySetNotes.length) {
            minIndex = this.keySetNotes.length - optionAmount
            maxIndex = this.keySetNotes.length
        }

        const selectionOptions = shuffle(this.keySetNotes.slice(minIndex, maxIndex));
        return selectionOptions;
    }


    private noteRange(range: "treble" | "bass" | "upperTreble" | "lowest" | "highest"): number[] {
        switch (range) {
            case "highest":
                return [45,51]; //note range index
            case "upperTreble":
                return [34,44]; //note range index
            case "treble":
                return [23,33]; //note range index
            case "bass":
                return [13,23]; //note range index
            case "lowest":
                return [0,12];  //note range index
        }
    }




    //Helper Methods
    //==================================================================
    private randomProbability() {
        let rand = Number((Math.random() * this.probabilityNumber).toFixed(1));
        console.log("rand:", rand);
        return rand;
    }


    private findNoteFromRandom(iNoteData: iNoteData, randNum: number): string {
        let findNum = randNum;

        for (let i:number = 0; i < this.keySetNotes.length; i++) {
            findNum -= iNoteData[this.keySetNotes[i]].score;
    
            if (findNum <= 0) {
                return this.keySetNotes[i];
            }
        }
        return ""
    }


 

    //Public Utility Methods
    //==================================================================
    public countProbabilityPool(iNoteData: iNoteData) {
        let probabilityNumber = 0;

        for (let i = 0; i < this.keySetNotes.length; i++) {
            probabilityNumber += iNoteData[this.keySetNotes[i]].score
        }

        this.probabilityNumber = probabilityNumber
        return probabilityNumber
    }
}