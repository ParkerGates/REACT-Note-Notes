import { iNoteData, iSingleNoteData, iFlashcardNotePayload, iGameSettings, iNote } from '../interfaces/interfaces';
import { clamp, calcAccuracyScore, calcTimeScore, getTroubleNoteRange } from "../utilities/utilities";
import { shuffle } from "../utilities/utilities"
import TimeQueue from '../utilities/timeQueue';

export default class FlashcardGame {
    private keySetNotes: string[];
    public probabilityNumber: number;

    private lastNoteChosen: string;
    private gameSettings: iGameSettings;


    constructor(gameSettings: iGameSettings, noteData: iNoteData) {
        this.gameSettings = gameSettings;

        this.keySetNotes = FlashcardGame.noteRange(gameSettings.keyset, gameSettings.cardType, noteData);
        this.probabilityNumber = 0;

        this.lastNoteChosen = "";
    }


    public getNote = (noteData: iNoteData, priorNoteChosen: string): iFlashcardNotePayload => {
        const chosenNote: iNote = this.findNoteFromProbabilityNum(noteData, priorNoteChosen);

        const payload: iFlashcardNotePayload = {
            find: chosenNote,
            options: this.createOptionsArray(this.keySetNotes.indexOf(chosenNote)),
            lockedIn: false
        }
        return payload;
    }


    static updateNoteData(note: iNote, correct: boolean, time: number, prior: iSingleNoteData): iSingleNoteData {
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


    static noteRange(range: "treble"|"bass", cardType: "all"|"trouble", noteData: iNoteData): string[] {
        let createNoteRange: any;
        const trebleNotes = ["c4","d4","e4","f4","g4","a4","b4","c5","d5","e5","f5"];
        const bassNotes = ["g2","a2","b2","c3","d3","e3","f3","g3","a3","b3","c4"];

        switch (range) {
            case "treble":
                createNoteRange = cardType === "all" ? trebleNotes : getTroubleNoteRange(trebleNotes, noteData);
                return createNoteRange;                 //^note range index
            case "bass":
                createNoteRange = cardType === "all" ? bassNotes : getTroubleNoteRange(bassNotes, noteData);
                return createNoteRange;                 //^note range index
            default:
                createNoteRange = cardType === "all" ? trebleNotes : getTroubleNoteRange(trebleNotes, noteData);
                return createNoteRange;    
        }
    }




    //Helper Methods
    //==================================================================
    private findNoteFromProbabilityNum(noteData: iNoteData, priorNoteChosen: string): iNote {
        let newNoteChosen: iNote = "";

        let findNum: number = Number((Math.random() * this.probabilityNumber).toFixed(1));

        for (let i:number = 0; i < this.keySetNotes.length; i++) {
            findNum -= noteData[this.keySetNotes[i]].score;
    
            if (findNum <= 0) {
                if (this.keySetNotes[i] === priorNoteChosen) {
                    i = 0;
                    findNum = Number((Math.random() * this.probabilityNumber).toFixed(1));
                }
                else {
                    newNoteChosen = this.keySetNotes[i] as iNote;
                    return newNoteChosen;
                }
            }
        }
        return newNoteChosen;
    }


 

    //Public Utility Methods
    //==================================================================
    //accumulates note score, returns total
    public countProbabilityPool(noteData: iNoteData): number {
        let probabilityNumber = 0;

        this.keySetNotes.forEach((item, index) => {
            probabilityNumber += noteData[item].score
        })

        this.probabilityNumber = probabilityNumber;
        return probabilityNumber
    }
}