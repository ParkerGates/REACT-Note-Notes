import { useEffect, useState } from 'react';
import { useContextData } from '../context/context';
import { iFlashcardGameState, iFlashcardNotePayload } from '../interfaces/interfaces';
import useTimer from 'easytimer-react-hook';
import FlashcardGame from "../classes/FlashcardGame";
import FlashcardCountdown from '../components/FlashcardComponents/FlashcardCountdown/FlashcardCountdown';
import FlashcardStartButton from '../components/FlashcardComponents/FlashcardStartButton/FlashcardStartButton';
import FlashcardImageAndOptions from '../components/FlashcardComponents/FlashcardsImageAndOptions/FlashcardImageOptions';

export default function Flashcards() {
    const contextData = useContextData();
    const game = new FlashcardGame(contextData.contextState.gameSettings, contextData.contextState.noteData);

    const [timer, isTargetAchived] = useTimer({precision: "secondTenths", updateWhenTargetAchieved: true});
    const [cardPayload, setCardPayload] = useState<iFlashcardNotePayload>({find:"",options:[]});
    const [gameState, setGameState] = useState<iFlashcardGameState>({
        currentState: "no-game",
        isCardChosen: false,
        countdown: 3,
        gameType: {type:"limitless"},
    });
    const [timedGame, timedGameIsDone] = useTimer({countdown: true, startValues: { seconds: 10 }, updateWhenTargetAchieved: true});
    const [limitedGameCount, setLimitedGameCount] = useState(0);



    const startGameCountdown = ():void => {
        setGameState({...gameState, currentState:"pre-game"})

        const countDownInterval = setInterval(() => {
            setGameState((prevState) => {
                if (prevState.countdown <= 1) {
                    nextCard();
                    clearInterval(countDownInterval);
                    if(gameState.gameType.type === "timed") timedGame.start();
                    return {...prevState, currentState:"game"};
                }
                return {...prevState, countdown: prevState.countdown - 1}
            });
        }, 1000);
    }
 
 
    const nextCard = ():void  => {
        game.probabilityNumber = contextData.contextState.probabilityPool;
        setGameState((prevState) => {return{...prevState, isCardChosen: false}});
        setCardPayload(game.getNote(contextData.contextState.noteData, cardPayload.find));
        timer.start({ startValues: [0,0,0,0,0], target: {seconds: 5}, precision: 'secondTenths'});
    }
 
 
    const handleSelectedOption = (correctIndex: string, selectedIndex: string): void => {
        if (gameState.isCardChosen === false) {
            setGameState({...gameState, isCardChosen: true});
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

            if (gameState.gameType.type === "set") setLimitedGameCount(limitedGameCount + 1);
            nextCard();
        }, 1500);
    }
 
   //On Start Routines
    useEffect(() => {
        game.countProbabilityPool(contextData.contextState.noteData);
        contextData.contextDispatch({type: "update-probability-pool", assign:game.probabilityNumber});
        setGameState({...gameState, gameType:contextData.contextState.gameSettings.gameType});
    }, [])


    //GameType End State Triggers
    useEffect(() => {
        if (timedGameIsDone === true) {
            setGameState((prevState) => {return {...prevState, currentState:"post-game"}});
        }
        if (limitedGameCount === 3) {
            setGameState((prevState) => {return {...prevState, currentState:"post-game"}});
        }
    }, [timedGameIsDone, limitedGameCount]);



 
    return(
        <div>
            <h4>Flashcards</h4>
            { "no-game" === gameState.currentState && <FlashcardStartButton startGameCountdown={startGameCountdown}/> }
 
            { "pre-game" === gameState.currentState && <FlashcardCountdown countDownNumber={gameState.countdown}/> }
 
            { "game" === gameState.currentState && 
                <div>
                    <FlashcardImageAndOptions 
                        find={cardPayload.find}
                        image={cardPayload.find}
                        options={cardPayload.options}
                        inputType={contextData.contextState.gameSettings.inputType}
                        handleSelectedOption={handleSelectedOption}
                    /> 
                    { (gameState.gameType.type === "limitless" || gameState.gameType.type === null) &&
                        <button onClick={()=>{setGameState((prevState) => {return {...prevState, currentState:"post-game"}})}}>End Game</button>
                    }
                </div>
            }
           
            { "post-game" === gameState.currentState && "post game" }
 
        </div>
    );
}