import { useState } from "react";
import { useContextData } from "../context/context";
import { useNavigate } from "react-router-dom";
import { iGameSettings, iKeysetScoreInfo } from "../interfaces/interfaces";
import SetUpPage1 from "../components/SetUpContainerPages/Page1/Page1";
import SetUpPage2 from "../components/SetUpContainerPages/Page2/Page2";
import SetUpPage3 from "../components/SetUpContainerPages/Page3/Page3";
import DotsLongest from "../svgs/Background/DotsLongest.svg";
import BotSmall from "../svgs/Background/BotSmall.svg";
import Bloom from "../svgs/Background/HalfBloom.svg";
import "./css/setup.css";
import "../App.css";

export default function Setup() {
    const data = useContextData();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [gameData, setGameData] = useState<iGameSettings>({
        keyset: "treble",
        gameType: {type: data.contextState.defaultGameSettings.gameType.type, action:data.contextState.defaultGameSettings.gameType.type},
        optionAmount: data.contextState.defaultGameSettings.optionAmount,
        cardType: data.contextState.defaultGameSettings.cardType,
        inputType: data.contextState.defaultGameSettings.inputType
    });
    const [keysetInfo, setKeysetInfo] = useState<iKeysetScoreInfo>({masteryLvl:0, avgAccuracy: 0, avgTime: 0, orderByScore: []});

    const pageNav = (direction: "forward" | "back") => {
        const newPage = direction === "forward" ? currentPage + 1 : currentPage - 1;
        setCurrentPage(newPage);
    }

    const launchGame = () => {
        data.contextDispatch({type:"update-game-settings", gameSettings:gameData});
        console.log(gameData);
        navigate("/flashcards", {replace: true});  
    }


    return(
        <div style={{overflow:"hidden", position:"relative"}}>
            <div className="SetupContainer">
                <div className="setupGuideContainer">
                    <h1 className="setupTitle">Setup</h1>
                    <hr className="setupHr" />
                    <div className="setupPageIndicator">
                        <span className={currentPage===1?"curPage":""}>Keyset</span>
                        <span className={currentPage===2?"curPage":""}>Game Info</span>
                        <span className={currentPage===3?"curPage":""}>Game Config</span>
                    </div>
                </div>
                <img className="bloomSetup" src={Bloom} />
                {currentPage === 1 && <SetUpPage1 onNoteInfoChange={setKeysetInfo} onGameDataChange={setGameData} pageNav={pageNav}/>}
                {currentPage === 2 && <SetUpPage2 keysetInfo={keysetInfo} pageNav={pageNav} launchGame={launchGame}/>}
                {currentPage === 3 && <SetUpPage3 gameInfo={gameData} setGameInfo={setGameData} pageNav={pageNav} launchGame={launchGame}/>}
                
            </div>
            <div className="botBarContainerSetup">
                <img className="botSetup" src={BotSmall} alt="gradiant rectangle" />
            </div>
            <img className="dotsSetup" src={DotsLongest} alt="dots" />
        </div>
    );
}