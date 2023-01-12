import { useEffect, useState } from 'react';
import { useContextData } from '../context/context';
import { iFlashcardGameState, iFlashcardNotePayload, iNote, iSingleGameStats } from '../interfaces/interfaces';
import { Link } from 'react-router-dom';
import useTimer from 'easytimer-react-hook';
import FlashcardGame from "../classes/FlashcardGame";
import FlashcardCountdown from '../components/FlashcardComponents/FlashcardCountdown/FlashcardCountdown';
import FlashcardOptions from '../components/FlashcardComponents/FlashcardOptions/FlashcardOptions';
import FlashcardEndScreen from '../components/FlashcardComponents/FlashcardEndScreen/FlashcardEndScreen';
import DotsLongest from "../svgs/Background/DotsLongest.svg";
import Bloom from "../svgs/Background/HalfBloom.svg";
import '../components/FlashcardComponents/FlashcardEndScreen/FlashcardEndScreen.css'
import "./css/flashcards.css";
import "../App.css";

export default function Flashcards() {
    const contextData = useContextData();
    const game = new FlashcardGame(contextData.contextState.gameSettings, contextData.contextState.noteData);
    const [timer, isTargetAchived] = useTimer({precision: "secondTenths", updateWhenTargetAchieved: true});
    const [sessionStats, setSessionStats] = useState<iSingleGameStats>({});

    const [cardPayload, setCardPayload] = useState<iFlashcardNotePayload>({find:"",options:[]});
    const [gameState, setGameState] = useState<iFlashcardGameState>({
        currentState: "no-game",
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
        resetShownAnswer();
        game.probabilityNumber = contextData.contextState.probabilityPool;
        setCardPayload(game.getNote(contextData.contextState.noteData, cardPayload.find));
        timer.start({ startValues: [0,0,0,0,0], target: {seconds: 5}, precision: 'secondTenths'});
    }
 
 
    const handleSelectedOption = (correctIndex: string, selectedIndex: string): void => {
        let cardTime = {...timer.getTotalTimeValues()};
        timer.stop();

        if (correctIndex === selectedIndex) {
            contextData.contextDispatch({type: "update-data", note: cardPayload.options[selectedIndex], correct: true, time: cardTime.secondTenths});
            updateSessionStats(cardPayload.find, true);
            document.getElementById(selectedIndex).style.backgroundColor = "green";
        }
        else {
            contextData.contextDispatch({type: "update-data", note: cardPayload.options[correctIndex], correct: false, time: cardTime.secondTenths});
            updateSessionStats(cardPayload.find, false);
            document.getElementById(correctIndex).style.backgroundColor = "green";
            document.getElementById(selectedIndex).style.backgroundColor = "red";
        }
        waitOnAnswerBeforeNextCard(correctIndex);
    }
 
 
    const waitOnAnswerBeforeNextCard = (correctIndex: string):void => {
        const displayAnswer = setTimeout(() => {
                if (gameState.gameType.type === "set") setLimitedGameCount(limitedGameCount + 1);
                nextCard();
        }, 1500);
    }


    const resetShownAnswer = () => cardPayload.options.forEach((item, index) => document.getElementById(String(index)).style.backgroundColor = "");


    const updateSessionStats = (note: iNote, correct: boolean) => {
        let newStats = {...sessionStats}
        if (sessionStats[note] === undefined) newStats[note] = {right:0,amount:0};

        newStats[note].amount += 1;
        newStats[note].right += Number(correct);
        setSessionStats(newStats);
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
        <div className="flashcardTestingContainer">
            
            <div className="flashcardCardDisplay">
                { "pre-game" === gameState.currentState && <FlashcardCountdown countDownNumber={gameState.countdown}/> }
                { "game" === gameState.currentState && cardPayload.find }
                { "post-game" === gameState.currentState && <FlashcardEndScreen stats={sessionStats} /> }
            </div>

            <div className="flashcardInteractArea">
                { "no-game" === gameState.currentState && 
                    <button className="btnPlain flashcardGameStartBtn" onClick={startGameCountdown}>Start</button>
                }


                { "game" === gameState.currentState && 
                    <>
                        <div>
                            <FlashcardOptions 
                                find={cardPayload.find}
                                options={cardPayload.options}
                                inputType={contextData.contextState.gameSettings.inputType}
                                handleSelectedOption={handleSelectedOption}
                            />
                        </div>
                        { (gameState.gameType.type === "limitless" || gameState.gameType.type === null) &&
                            <button
                                className="flashcardEndGameBtn" 
                                onClick={()=>{setGameState((prevState) => {return {...prevState, currentState:"post-game"}})}}>
                                    End Game
                            </button>
                        }
                    </>
                }

                {  "post-game" === gameState.currentState &&
                    <div className="endGameBtnContainer">
                        <Link to="/"><button className="btnPlain endGameBtns">Home</button></Link>
                        <Link to="/reloads/flashcards"><button className="btnPlain endGameBtns">Replay</button></Link>
                        <Link to="/setup"><button className="btnPlain endGameBtns">New Game</button></Link>
                    </div>
                }
            </div>
            <div className="botFlashcards">&nbsp;</div>
            
            <div className="flashcardBg">
                <img className="dotsFlashcards" src={DotsLongest} alt="dots" />
            </div>
            <img className="bloomFlashcards" src={Bloom} />
        </div>
    );
}