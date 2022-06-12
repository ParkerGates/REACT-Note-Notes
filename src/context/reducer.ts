import noteData from './data'
import FlashcardGame from '../classes/FlashcardGame';
import { iContextState, iSingleNoteData } from '../interfaces/interfaces';
const _ = require('lodash');
 
let newState: iContextState;
let newSingleNoteData: iSingleNoteData;

const initialState: iContextState = {
    noteData: noteData,
    probabilityPool: 0,
    defaultGameSettings: { keyset: "treble", gameType: {type: 'limitless'}, optionAmount:"4", cardType: "all", inputType: "mouse-click" },
    gameSettings: { keyset: "", gameType: {type: null}, optionAmount:"", cardType: "", inputType: "" },
};

const reducer = (state:any , action:any) => {
    switch(action.type) {
        case "update-data":                 //action {note, correct, time}
            newState = _.cloneDeep(state);
            //console.log(newState.noteData[action.note]);
            newSingleNoteData = FlashcardGame.updateNoteData(action.note, action.correct, action.time, newState.noteData[action.note]);

            newState.noteData[action.note] = newSingleNoteData;
            newState.probabilityPool = (newState.noteData[action.note].score - state.noteData[action.note].score) + state.probabilityPool;
            //console.log(newState.noteData[action.note]);
            return newState;


        case "update-probability-pool":     //action {assign}
            newState = { ...state };
            newState.probabilityPool = action.assign;
            return newState;


        case "update-game-settings":        //action {gameSettings}
            newState = {...state, gameSettings: action.gameSettings}
            return newState;


        case "reset":
            return initialState;
        default:
            return state;
    }
}

export {initialState, reducer}