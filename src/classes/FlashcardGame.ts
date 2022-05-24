import { allKeys } from '../context/data';
import shuffle from "../utilities/shuffleArray";

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


    public getNote = (noteData: any): any => {
        const chosenNote = this.findNoteFromRandom(noteData, this.randomProbability());

        const payload = {
            find: chosenNote,
            options: this.createOptionsArray(this.keySetNotes.indexOf(chosenNote))
        }
        console.log(payload);
        return payload;
    }


    public updateNote(note: string) {
        console.log("Update Note")
    }




    //Private Utility Methods
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


    private randomProbability() {
        let rand = Math.floor(Math.random() * this.probabilityNumber);
        return rand;
    }


    private findNoteFromRandom(noteData: any, randNum: number): string {
        let findNum = randNum;

        for (let i = 0; i < this.keySetNotes.length; i++) {
            findNum -= noteData[this.keySetNotes[i]].score;
    
            if (findNum <= 0) {
                console.log(randNum);
                return this.keySetNotes[i];
            }
        }
        return ""
    }




    //Public Utility Methods
    //==================================================================
    public countProbabilityPool(noteData: any) {
        let probabilityNumber = 0;

        for (let i = 0; i < this.keySetNotes.length; i++) {
            probabilityNumber += noteData[this.keySetNotes[i]].score
        }

        this.probabilityNumber = probabilityNumber
        return probabilityNumber
    }
}