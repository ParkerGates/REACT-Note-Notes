import noteData from './data'

const initialState = {
    probabilityPool: 0,
    noteData: noteData
};

const reducer = (state:any , action:any) => {
    switch(action.type) {
        case "test1":
            console.log(state)
            return {...state, probabilityPool: 5}
        case "reset":
            return initialState;
        default:
            return state;
    }
}

export {initialState, reducer}