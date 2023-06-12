import { noteData, newNoteData, guestNoteData, guestNoteDataTESTING } from './data'
import FlashcardGame from '../classes/FlashcardGame';
import { iContextState, iSingleNoteData } from '../interfaces/interfaces';
const _ = require('lodash');
 
let newState: iContextState;
let newSingleNoteData: iSingleNoteData;

const initialState: iContextState = {
    noteData: newNoteData,
    probabilityPool: 0,
    defaultGameSettings: { keyset: "treble", gameType: {type: 'limitless', action:null}, optionAmount:4, cardType: "all", inputType: "mouse-click" },
    gameSettings: { keyset: "treble", gameType: {type: 'limitless', action:null}, optionAmount:4, cardType: "all", inputType: "mouse-click" },
    guest: false
};

const reducer = (state:any , action:any) => {
    switch(action.type) {
        case "update-data":
        //action {note, correct, time}
            newState = _.cloneDeep(state);
            newSingleNoteData = FlashcardGame.updateNoteData(action.note, action.correct, action.time, newState.noteData[action.note]);

            newState.noteData[action.note] = newSingleNoteData;
            newState.probabilityPool = (newState.noteData[action.note].score - state.noteData[action.note].score) + state.probabilityPool;
            return newState;

        case "new-state":
            //action {newState}
            newState = action.newState;
            return newState;

        case "update-probability-pool":
        //action {assign}
            newState = { ...state };
            newState.probabilityPool = action.assign;
            return newState;

        case "update-game-settings":
        //action {gameSettings}
            newState = {...state, gameSettings: action.gameSettings}
            return newState;

        case "update-default-game-settings":
        //action {gameSettings}
            newState = {...state, defaultGameSettings: {...action.gameSettings, keyset:""}}
            return newState;

        case "guestSignInToggle":
            newState = {...initialState, guest: !state.guest, noteData: guestNoteDataTESTING }
            return newState;

        case "reset":
            return initialState;

        default:
            return state;
    }
}

export {initialState, reducer}