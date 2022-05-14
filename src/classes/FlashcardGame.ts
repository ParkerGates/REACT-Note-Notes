import shuffle from "../utilities/shuffleArray";

export default class FlashcardGame {
    private keySet:"treble" | "bass" | "upperTreble" | "lowest" | "highest";
    private keySetIndexRange: number[];
    private keySetNotes: string[];
    private allNotes = ["a0","b0","c1","d1","e1","f1","g1","a1","b1","c2","d2","e2","f2","g2","a2","b2","c3","d3","e3","f3", "g3","a3","b3","c4","d4","e4","f4","g4","a4","b4","c5","d5","e5","f5","g5","a5","b5","c6","d6","e6","f6","g6","a6","b6","c7","d7","e7","f7","g7","a7","b7","c8"]


    constructor(keySet: "treble" | "bass" | "upperTreble" | "lowest" | "highest") {
        this.keySet = keySet;
        this.keySetIndexRange = this.noteRange(keySet)
        this.keySetNotes = this.allNotes.slice(this.keySetIndexRange[0],this.keySetIndexRange[1] + 1)
    }


    public getNote = (): any => {
        console.log(this.keySet)

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
}