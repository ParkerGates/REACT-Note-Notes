export interface iSingleNoteData {
    note: string;
    acc: number;
    dataSize?: number;
    time?: number[];
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
    find: iNote;
    options: string[];
}

export interface iGameSettings {
    keyset: "treble" | "bass" | "upperTreble" | "lowest" | "highest";
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
    a0?: {right:number, amount:number};      b0?: {right:number, amount:number};      c1?: {right:number, amount:number};
    d1?: {right:number, amount:number};      e1?: {right:number, amount:number};      f1?: {right:number, amount:number};
    g1?: {right:number, amount:number};      a1?: {right:number, amount:number};      b1?: {right:number, amount:number};
    c2?: {right:number, amount:number};      d2?: {right:number, amount:number};      e2?: {right:number, amount:number};
    f2?: {right:number, amount:number};      g2?: {right:number, amount:number};      a2?: {right:number, amount:number};
    b2?: {right:number, amount:number};      c3?: {right:number, amount:number};      d3?: {right:number, amount:number};
    e3?: {right:number, amount:number};      f3?: {right:number, amount:number};      g3?: {right:number, amount:number};
    a3?: {right:number, amount:number};      b3?: {right:number, amount:number};      c4?: {right:number, amount:number};
    d4?: {right:number, amount:number};      e4?: {right:number, amount:number};      f4?: {right:number, amount:number};
    g4?: {right:number, amount:number};      a4?: {right:number, amount:number};      b4?: {right:number, amount:number};
    c5?: {right:number, amount:number};      d5?: {right:number, amount:number};      e5?: {right:number, amount:number};
    f5?: {right:number, amount:number};      g5?: {right:number, amount:number};      a5?: {right:number, amount:number};
    b5?: {right:number, amount:number};      c6?: {right:number, amount:number};      d6?: {right:number, amount:number};
    e6?: {right:number, amount:number};      f6?: {right:number, amount:number};      g6?: {right:number, amount:number};
    a6?: {right:number, amount:number};      b6?: {right:number, amount:number};      c7?: {right:number, amount:number};
    d7?: {right:number, amount:number};      e7?: {right:number, amount:number};      f7?: {right:number, amount:number};
    g7?: {right:number, amount:number};      a7?: {right:number, amount:number};      b7?: {right:number, amount:number};
    c8?: {right:number, amount:number};
}

export type iNote = "a0"|"b0"|"c1"|"d1"|"e1"|"f1"|"g1"|"a1"|"b1"|"c2"|"d2"|"e2"|"f2"|"g2"|"a2"|"b2"|"c3"|"d3"|"e3"|"f3"| "g3"|"a3"|"b3"|"c4"|"d4"|"e4"|"f4"|"g4"|"a4"|"b4"|"c5"|"d5"|"e5"|"f5"|"g5"|"a5"|"b5"|"c6"|"d6"|"e6"|"f6"|"g6"|"a6"|"b6"|"c7"|"d7"|"e7"|"f7"|"g7"|"a7"|"b7"|"c8"|""