import { useState, useContext} from 'react';
import { useScore, ScoreContext } from '../context/context';
import FlashcardGame from "../classes/FlashcardGame";
import FlashcardImage from "../components/FlashcardComponents/FlashcardImage/FlashcardImage";
import FlashcardOptions from "../components/FlashcardComponents/FlashcardOptions/FlashcardOptions";

export default function Flashcards() {
    const [gameState, setGameState] = useState<"no-game"|"pre-game"|"game"|"post-game">("no-game");
    const [countdown, setCountDown] = useState<number>(3);
    
    let test = new FlashcardGame("treble");
    const data = useContext(ScoreContext)
    //console.log(data.scoreState.noteData);
    test.countProbabilityPool(data.scoreState.noteData)
    test.getNote(data.scoreState.noteData);
    
    const startGameCountdown = () => {
        setGameState("pre-game");
        const countDownInterval = setInterval(() => {

            setCountDown((prevState) => {
                if (prevState <= 1) {
                    clearInterval(countDownInterval);
                    setGameState("game");
                    return prevState;
                }
                return prevState - 1
            });
        }, 1000);
    }


    return(
        <div>
            <h4>Flashcards</h4>
            { "no-game" === gameState &&
                <div>
                    <button onClick={startGameCountdown}>Start</button>
                </div>
            }

            { "pre-game" === gameState &&
                <div>
                    <h3>{countdown}</h3>
                </div>
            }

            { "game" === gameState &&
                <div>
                    <div>
                        <FlashcardImage />
                    </div>
                    <div>
                        <FlashcardOptions />
                    </div>
                </div> 
            }
            
            { "post-game" === gameState &&
                "sigh hawaii"
            }
        </div>
    );
}