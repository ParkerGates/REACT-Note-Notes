export interface iSingleNoteData {
    note: string;
    acc: number;
    dataSize: number;
    time: number[];
    avgTime: number;
    score: number;
}

export interface iNoteData {
    a0: iSingleNoteData;     b0: iSingleNoteData;     c1: iSingleNoteData;     d1: iSingleNoteData;
    e1: iSingleNoteData;     f1: iSingleNoteData;     g1: iSingleNoteData;     a1: iSingleNoteData;
    b1: iSingleNoteData;     c2: iSingleNoteData;     d2: iSingleNoteData;     e2: iSingleNoteData;
    f2: iSingleNoteData;     g2: iSingleNoteData;     a2: iSingleNoteData;     b2: iSingleNoteData;
    c3: iSingleNoteData;     d3: iSingleNoteData;     e3: iSingleNoteData;     f3: iSingleNoteData;
    g3: iSingleNoteData;     a3: iSingleNoteData;     b3: iSingleNoteData;     c4: iSingleNoteData;
    d4: iSingleNoteData;     e4: iSingleNoteData;     f4: iSingleNoteData;     g4: iSingleNoteData;
    a4: iSingleNoteData;     b4: iSingleNoteData;     c5: iSingleNoteData;     d5: iSingleNoteData;
    e5: iSingleNoteData;     f5: iSingleNoteData;     g5: iSingleNoteData;     a5: iSingleNoteData;
    b5: iSingleNoteData;     c6: iSingleNoteData;     d6: iSingleNoteData;     e6: iSingleNoteData;
    f6: iSingleNoteData;     g6: iSingleNoteData;     a6: iSingleNoteData;     b6: iSingleNoteData;
    c7: iSingleNoteData;     d7: iSingleNoteData;     e7: iSingleNoteData;     f7: iSingleNoteData;
    g7: iSingleNoteData;     a7: iSingleNoteData;     b7: iSingleNoteData;     c8: iSingleNoteData;
}

export interface iContextState {
    defaultGameSettings: iGameSettings | null;
    gameSettings: iGameSettings | null;
    probabilityPool: number;
    noteData: iNoteData;
}

export interface iFlashcardNotePayload {
    find: string;
    options: string[];
}

export interface iGameSettings {
    note: "treble" | "bass" | "upperTreble" | "lowest" | "highest" | "";
    gameType: {type:"limitless"} | {type:"timed"} | {type:"set", amount: number} | {type: null};
    cardType: "all" | "trouble cards" | "";
    inputType: "mouse-click" | "number-keys" | "hover-wheel" | "";
}

export interface iNoteScoreInfo {
    mastery: number;
    averageAcc: number;
    averageTime: number;
    bestToWorse: any[];
    WorseAmount: number;
}