export type iNote = "g2"|"a2"|"b2"|"c3"|"d3"|"e3"|"f3"| "g3"|"a3"|"b3"|"c4"|"d4"|"e4"|"f4"|"g4"|"a4"|"b4"|"c5"|"d5"|"e5"|"f5"|""

export interface iSingleNoteData {
    note: iNote;
    acc: number;
    dataSize?: number;
    time?: number[];
    avgTime: number;
    score: number;
}

export interface iNoteData {
    g2: iSingleNoteData;     a2: iSingleNoteData;     b2: iSingleNoteData;     c3: iSingleNoteData;
    d3: iSingleNoteData;     e3: iSingleNoteData;     f3: iSingleNoteData;     g3: iSingleNoteData;
    a3: iSingleNoteData;     b3: iSingleNoteData;     c4: iSingleNoteData;     d4: iSingleNoteData;
    e4: iSingleNoteData;     f4: iSingleNoteData;     g4: iSingleNoteData;     a4: iSingleNoteData;
    b4: iSingleNoteData;     c5: iSingleNoteData;     d5: iSingleNoteData;     e5: iSingleNoteData;
    f5: iSingleNoteData;
}

export interface iContextState {
    defaultGameSettings: iGameSettings | null;
    gameSettings: iGameSettings | null;
    probabilityPool: number;
    noteData: iNoteData;
    guest: boolean;
}

export interface iFlashcardNotePayload {
    find: iNote;
    options: string[];
    lockedIn: boolean;
}

export interface iGameSettings {
    keyset: "treble" | "bass";
    gameType: {type:"limitless"|"timed"|"set", action?: any};
    optionAmount: 3 | 4 | 5 | 6 ;
    cardType: "all" | "trouble";
    inputType: "mouse-click" | "number-keys" | "arrow-keys";
}

export interface iKeysetScoreInfo {
    masteryLvl: number,
    avgAccuracy: number,
    avgTime: number,
    orderByScore: iSingleNoteData[],
}

export interface iFlashcardGameState {
    currentState: "no-game"|"pre-game"|"game"|"post-game",
    countdown: number,
    gameType: {type: any, action?: any};
}

export interface iSingleGameStats {
    g2?: {right:number, amount:number};      a2?: {right:number, amount:number};      b2?: {right:number, amount:number};
    c3?: {right:number, amount:number};      d3?: {right:number, amount:number};      e3?: {right:number, amount:number};
    f3?: {right:number, amount:number};      g3?: {right:number, amount:number};      a3?: {right:number, amount:number};
    b3?: {right:number, amount:number};      c4?: {right:number, amount:number};      d4?: {right:number, amount:number};
    e4?: {right:number, amount:number};      f4?: {right:number, amount:number};      g4?: {right:number, amount:number};
    a4?: {right:number, amount:number};      b4?: {right:number, amount:number};      c5?: {right:number, amount:number};
    d5?: {right:number, amount:number};      e5?: {right:number, amount:number};      f5?: {right:number, amount:number};
}