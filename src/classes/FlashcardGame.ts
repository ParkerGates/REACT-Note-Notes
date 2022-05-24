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


    public getNote = (): any => {
        console.log(this.keySetName)

        const note = this.keySetNotes[Math.floor(Math.random() * this.keySetNotes.length)];
        
        const payload = {
            find: note,
            options: this.createOptionsArray(this.keySetNotes.indexOf(note), this.keySetNotes)
        }
        return payload;
    }


    public updateNote(note: string) {
        console.log("Update Note")
    }





    //Private Utility Methods
    //==================================================================
    private createOptionsArray(selectedIndex: number, noteRange: string[]): string[] {
        const optionAmount = 5;
        const randomOffset = Math.floor(Math.random() * optionAmount) + 1
        let maxIndex = selectedIndex + randomOffset;
        let minIndex = selectedIndex - (5 - randomOffset);

        if (minIndex < 0) {
            maxIndex = optionAmount
            minIndex = 0;
        }
        else if (maxIndex > noteRange.length) {
            minIndex = noteRange.length - optionAmount
            maxIndex = noteRange.length
        }

        const selectionOptions = shuffle(noteRange.slice(minIndex, maxIndex));

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