import noteData from './data'
import FlashcardGame from '../classes/FlashcardGame';
import { iContextState, iSingleNoteData } from '../interfaces/interfaces';
const _ = require('lodash');
 
let newState: iContextState;
let newSingleNoteData: iSingleNoteData;

const initialState: iContextState = {
    noteData: noteData,
    probabilityPool: 0,
    defaultGameSettings: { note: "", gameType: {type: null}, cardType: "", inputType: "" },
    gameSettings: { note: "", gameType: {type: null}, cardType: "", inputType: "" },
};

const reducer = (state:any , action:any) => {
    switch(action.type) {
        case "update-data":
            newState = _.cloneDeep(state);
            //console.log(newState.noteData[action.note]);
            newSingleNoteData = FlashcardGame.updateNoteData(action.note, action.correct, action.time, newState.noteData[action.note]);

            newState.noteData[action.note] = newSingleNoteData;
            newState.probabilityPool = (newState.noteData[action.note].score - state.noteData[action.note].score) + state.probabilityPool;
            //console.log(newState.noteData[action.note]);
            return newState;

        case "update-probability-pool":
            newState = { ...state };
            newState.probabilityPool = action.assign;
            return newState;

        case "reset":
            return initialState;
        default:
            return state;
    }
}

export {initialState, reducer}