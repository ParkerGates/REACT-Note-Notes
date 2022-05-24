import { useContext} from 'react';
import { useScore, ScoreContext } from '../context/context';
import FlashcardGame from "../classes/FlashcardGame";

export default function Flashcards() {
    let test = new FlashcardGame("treble");
    const data = useContext(ScoreContext)
    //console.log(data.scoreState.noteData);
    
    test.countProbabilityPool(data.scoreState.noteData);

    const TestThing = () => {
        //data.scoreDispatch({type: "test1"});
    }

    return(
        <div>
            <h4>Flashcards</h4>
            <button onClick={TestThing}>Test</button>
        </div>
    );
}