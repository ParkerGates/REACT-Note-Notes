import noteData from './data'
import FlashcardGame from '../classes/FlashcardGame';
import { iContextState, iSingleNoteData } from '../interfaces/interfaces';
const _ = require('lodash');
 
let newState: iContextState;
let newSingleNoteData: iSingleNoteData;

const initialState: iContextState = {
    probabilityPool: 0,
    noteData: noteData
};

const reducer = (state:any , action:any) => {
    switch(action.type) {
        case "update-data":

            newState = _.cloneDeep(state);

            newSingleNoteData = FlashcardGame.updateNoteData(action.note, action.correct, action.time, newState.noteData[action.note]);
            newState.noteData[action.note] = newSingleNoteData;
            return newState;


        case "reset":
            return initialState;
        default:
            return state;
    }
}

export {initialState, reducer}