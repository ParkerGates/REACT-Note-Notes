import { useEffect, useState } from 'react';
import { useContextData } from '../context/context';
import useTimer from 'easytimer-react-hook';
import { iFlashcardNotePayload } from '../interfaces/interfaces';
import FlashcardGame from "../classes/FlashcardGame";
import FlashcardCountdown from '../components/FlashcardComponents/FlashcardCountdown/FlashcardCountdown';
import FlashcardStartButton from '../components/FlashcardComponents/FlashcardStartButton/FlashcardStartButton';
import FlashcardImageAndOptions from '../components/FlashcardComponents/FlashcardsImageAndOptions/FlashcardImageOptions';

export default function Flashcards() {
    const [timer, isTargetAchived] = useTimer({precision: "secondTenths", updateWhenTargetAchieved: true});
    const [gameState, setGameState] = useState<"no-game"|"pre-game"|"game"|"post-game">("no-game");
    const [countdown, setCountDown] = useState<number>(3);
 
    const [cardPayload, setCardPayload] = useState<iFlashcardNotePayload>({find:"",options:[]});
    const [isCardChosen, setIsCardChosen] = useState<boolean>(false);
    const contextData = useContextData();
 
    const game = new FlashcardGame("treble");
 
    const startGameCountdown = ():void => {
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
 
 
    const nextCard = ():void  => {
        game.probabilityNumber = contextData.contextState.probabilityPool;
        setIsCardChosen(false);
        setCardPayload(game.getNote(contextData.contextState.noteData));
        timer.start({ startValues: [0,0,0,0,0], target: {seconds: 5}, precision: 'secondTenths'});
    }
 
 
    const handleSelectedOption = (correctIndex: string, selectedIndex: string): void => {
        if (isCardChosen === false) {
            setIsCardChosen(true);

            let cardTime = {...timer.getTotalTimeValues()};
            timer.stop();

            if (correctIndex === selectedIndex) {
                contextData.contextDispatch({type: "update-data", note: cardPayload.options[selectedIndex], correct: true, time: cardTime.secondTenths});
 
                document.getElementById(selectedIndex).style.backgroundColor = "green";
                waitOnAnswerBeforeNextCard(selectedIndex);
            }
            else {
                contextData.contextDispatch({type: "update-data", note: cardPayload.options[correctIndex], correct: false, time: cardTime.secondTenths});
 
                document.getElementById(correctIndex).style.backgroundColor = "green";
                document.getElementById(selectedIndex).style.backgroundColor = "red";
                waitOnAnswerBeforeNextCard(correctIndex, selectedIndex);
            }
        }
    }
 
 
    const waitOnAnswerBeforeNextCard = (right: string, wrong:string = ""):void => {
        const displayAnswer = setTimeout(() => {
            if (wrong !== "") {
                document.getElementById(wrong).style.backgroundColor = "";
            }
            document.getElementById(right).style.backgroundColor = "";
            
            nextCard();
        }, 1500);
    }
 
   
    useEffect(() => {
        game.countProbabilityPool(contextData.contextState.noteData);
        contextData.contextDispatch({type: "update-probability-pool", assign:game.probabilityNumber});
    }, [])

 
    return(
        <div>
            <h4>Flashcards</h4>
            { "no-game" === gameState &&    <FlashcardStartButton startGameCountdown={startGameCountdown}/> }
 
            { "pre-game" === gameState && <FlashcardCountdown countDownNumber={countdown}/> }
 
            { "game" === gameState && <FlashcardImageAndOptions find={cardPayload.find} image={cardPayload.find} options={cardPayload.options} handleSelectedOption={handleSelectedOption} /> }
           
            { "post-game" === gameState && "post game" }
 
        </div>
    );
}
