import { iNoteData, iSingleNoteData, iFlashcardNotePayload } from '../interfaces/interfaces';
import { allKeys } from '../context/data';
import { clamp } from "../utilities/utilities";
import shuffle from "../utilities/shuffleArray";
import TimeQueue from '../utilities/timeQueue';

export default class FlashcardGame {
    private keySetName:"treble" | "bass" | "upperTreble" | "lowest" | "highest";
    private keySetNotes: string[];
    public probabilityNumber: number;
    private allNotes: string[] = allKeys;


    constructor(keySetName: "treble" | "bass" | "upperTreble" | "lowest" | "highest") {
        this.keySetName = keySetName;
        this.keySetNotes = FlashcardGame.noteRange(keySetName, this.allNotes);
        this.probabilityNumber = 0
    }


    public getNote = (iNoteData: iNoteData): iFlashcardNotePayload => {
        const chosenNote: string = this.findNoteFromProbabilityNum(iNoteData, this.randomProbability());

        const payload: iFlashcardNotePayload = {
            find: chosenNote,
            options: this.createOptionsArray(this.keySetNotes.indexOf(chosenNote))
        }
        return payload;
    }


    static updateNoteData(note: string, correct: boolean, time: number, prior: iSingleNoteData): iSingleNoteData {
        const updatedNoteData: iSingleNoteData = {
            note: note,
            acc: correct === true ? clamp(prior.acc + 1, 1, 19) : clamp(prior.acc - 1, 1, 19),
            dataSize: prior.dataSize >= 20 ? 20 : prior.dataSize + 1,
            time: TimeQueue.enqueue(prior.time, time),
            avgTime: 0,
            score: 0
        }
        updatedNoteData.avgTime = TimeQueue.timeAverage(updatedNoteData.time);

        //Calc Accuracy & Time Score
        let accScore: number = Number( (Math.sqrt((100 - ((updatedNoteData.acc / updatedNoteData.dataSize) * 100))) / 2).toFixed(1));
        accScore = updatedNoteData.dataSize < 10 ? 4 : accScore;    //Wait till dataset is 10 before slimming calculations

        const timeScore: number = Number((updatedNoteData.avgTime / 2).toFixed(1));
        
        updatedNoteData.score = accScore + timeScore;
        return updatedNoteData;
    }




    //Setup Methods
    //==================================================================
    private createOptionsArray(selectedIndex: number): string[] {
        const optionAmount: number = 5;
        const randomOffset: number = Math.floor(Math.random() * optionAmount) + 1
        let maxIndex: number = selectedIndex + randomOffset;
        let minIndex: number = selectedIndex - (optionAmount - randomOffset);

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


    static noteRange(range: "treble" | "bass" | "upperTreble" | "lowest" | "highest", allNotes: string[]): string[] {
        switch (range) {
            case "highest":
                return allNotes.slice(45,52); //note range index
            case "upperTreble":
                return allNotes.slice(34,45); //note range index
            case "treble":
                return allNotes.slice(23,34); //note range index
            case "bass":
                return allNotes.slice(13,24); //note range index
            case "lowest":
                return allNotes.slice(0,13); //note range index
        }
    }




    //Helper Methods
    //==================================================================
    private findNoteFromProbabilityNum(iNoteData: iNoteData, randNum: number): string {
        let findNum: number = randNum;

        for (let i:number = 0; i < this.keySetNotes.length; i++) {
            findNum -= iNoteData[this.keySetNotes[i]].score;
    
            if (findNum <= 0) {
                return this.keySetNotes[i];
            }
        }
        return ""
    }


    private randomProbability(): number {
        let rand: number = Number((Math.random() * this.probabilityNumber).toFixed(1));
        return rand;
    }


 

    //Public Utility Methods
    //==================================================================
    public countProbabilityPool(iNoteData: iNoteData): number {
        let probabilityNumber = 0;

        for (let i = 0; i < this.keySetNotes.length; i++) {
            probabilityNumber += iNoteData[this.keySetNotes[i]].score
        }

        this.probabilityNumber = probabilityNumber;
        return probabilityNumber
    }
}