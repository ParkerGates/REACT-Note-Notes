import { iNoteData, iSingleNoteData, iFlashcardNotePayload, iGameSettings } from '../interfaces/interfaces';
import { allKeys } from '../context/data';
import { clamp, calcAccuracyScore, calcTimeScore } from "../utilities/utilities";
import shuffle from "../utilities/shuffleArray";
import TimeQueue from '../utilities/timeQueue';

export default class FlashcardGame {
    private keySetName:"treble" | "bass" | "upperTreble" | "lowest" | "highest";
    private keySetNotes: string[];
    public probabilityNumber: number;

    private lastNoteChosen: string;
    private gameSettings: iGameSettings;


    constructor(keySetName: "treble" | "bass" | "upperTreble" | "lowest" | "highest", gameSettings: iGameSettings) {
        this.keySetName = keySetName;
        this.keySetNotes = FlashcardGame.noteRange(keySetName);
        this.probabilityNumber = 0;

        this.lastNoteChosen = "";
        this.gameSettings = gameSettings;
    }


    public getNote = (iNoteData: iNoteData, priorNoteChosen: string): iFlashcardNotePayload => {
        const chosenNote: string = this.findNoteFromProbabilityNum(iNoteData, priorNoteChosen);

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
        let accScore: number = calcAccuracyScore(updatedNoteData.acc,updatedNoteData.dataSize);
        const timeScore: number = calcTimeScore(updatedNoteData.avgTime);

        updatedNoteData.score = accScore + timeScore;
        return updatedNoteData;
    }




    //Setup Methods
    //==================================================================
    private createOptionsArray(selectedIndex: number): string[] {
        const optionAmount: number = this.gameSettings.optionAmount;
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


    static noteRange(range: "treble" | "bass" | "upperTreble" | "lowest" | "highest"): string[] {
        switch (range) {
            case "highest":
                return allKeys.slice(45,52); //note range index
            case "upperTreble":
                return allKeys.slice(34,45); //note range index
            case "treble":
                return allKeys.slice(23,34); //note range index
            case "bass":
                return allKeys.slice(13,24); //note range index
            case "lowest":
                return allKeys.slice(0,13); //note range index
        }
    }




    //Helper Methods
    //==================================================================
    private findNoteFromProbabilityNum(iNoteData: iNoteData, priorNoteChosen: string): string {
        let newNoteChosen: string = priorNoteChosen;

        let findNum: number = Number((Math.random() * this.probabilityNumber).toFixed(1));

        for (let i:number = 0; i < this.keySetNotes.length; i++) {
            findNum -= iNoteData[this.keySetNotes[i]].score;
    
            if (findNum <= 0) {
                if (this.keySetNotes[i] === priorNoteChosen) {
                    i = 0;
                    findNum = Number((Math.random() * this.probabilityNumber).toFixed(1));
                }
                else {
                    newNoteChosen = this.keySetNotes[i];
                    return newNoteChosen;
                }
            }
        }
        return newNoteChosen;
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