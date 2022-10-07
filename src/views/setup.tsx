import { useState } from "react";
import { useContextData } from "../context/context";
import { useNavigate } from "react-router-dom";
import { iGameSettings, iKeysetScoreInfo } from "../interfaces/interfaces";
import SetUpPage1 from "../components/SetUpContainerPages/Page1/Page1";
import SetUpPage2 from "../components/SetUpContainerPages/Page2/Page2";
import SetUpPage3 from "../components/SetUpContainerPages/Page3/Page3";
import DotsLongest from "../svgs/DotsLongest.svg";
import BotSmall from "../svgs/BotSmall.svg";
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
        navigate("/flashcards", {replace: true});  
    }


    return(
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
            {currentPage === 1 && <SetUpPage1 onNoteInfoChange={setKeysetInfo} onGameDataChange={setGameData} pageNav={pageNav}/>}
            {currentPage === 2 && <SetUpPage2 keysetInfo={keysetInfo} pageNav={pageNav} launchGame={launchGame}/>}
            {currentPage === 3 && <SetUpPage3 gameInfo={gameData} setGameInfo={setGameData} pageNav={pageNav} launchGame={launchGame}/>}

            <div className="setupBg">
                <img className="dotsSetup" src={DotsLongest} alt="dots" />
                <img className="botSetup" src={BotSmall} alt="gradiant rectangle" />
            </div>
        </div>
    );
}