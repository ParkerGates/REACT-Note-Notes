import { useState } from 'react';
import { useScore } from '../context/context';
import useTimer from 'easytimer-react-hook';
import FlashcardGame from "../classes/FlashcardGame";
import FlashcardImage from "../components/FlashcardComponents/FlashcardImage/FlashcardImage";
import FlashcardOptions from "../components/FlashcardComponents/FlashcardOptions/FlashcardOptions";

export default function Flashcards() {
    const [timer, isTargetAchived] = useTimer({precision: "secondTenths", updateWhenTargetAchieved: true});
    const [gameState, setGameState] = useState<"no-game"|"pre-game"|"game"|"post-game">("no-game");
    const [countdown, setCountDown] = useState<number>(3);

    const [cardPayload, setCardPayload] = useState<any>(null);
    const [isCardChosen, setIsCardChosen] = useState<boolean>(false);
    const data = useScore()

    const game = new FlashcardGame("treble");
    game.countProbabilityPool(data.scoreState.noteData);
    

    const startGameCountdown = () => {
        setGameState("pre-game");
        const countDownInterval = setInterval(() => {

            setCountDown((prevState) => {
                if (prevState <= 1) {
                    setGameState("game");
                    nextCard();
                    clearInterval(countDownInterval);
                    return prevState;
                }
                return prevState - 1
            });
        }, 1000);
    }


    const selectOption = (right: string, selected: string) => {
        if (isCardChosen === false) {
            setIsCardChosen(true);

            let cardTime = {...timer.getTotalTimeValues()};
            timer.stop()
            console.log(cardTime.secondTenths, isTargetAchived);

            if (right === selected) {
                console.log("Right:", right, selected);
            }
            else {
                console.log("Wrong: ", right, selected);
            }
        }
    }

    const nextCard = () => {
        setIsCardChosen(false);
        setCardPayload(game.getNote(data.scoreState.noteData));
        timer.start({ startValues: [0,0,0,0,0], target: {seconds: 5}, precision: 'secondTenths'});
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
                        <FlashcardImage image={cardPayload.find}/>
                    </div>
                    <div>
                        <FlashcardOptions find={cardPayload.find} options={cardPayload.options} selectOption={selectOption}/>
                    </div>
                </div> 
            }
            

            { "post-game" === gameState &&
                "sigh hawaii"
            }

            <button onClick={nextCard}>Next Card</button>
        </div>
    );
}