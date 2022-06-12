import { useEffect, useState } from "react";
import { useContextData } from "../context/context";
import { useNavigate } from "react-router-dom";
import SetUpPage1 from "../components/SetUpContainerPages/Page1/Page1";
import SetUpPage2 from "../components/SetUpContainerPages/Page2/Page2";
import SetUpPage3 from "../components/SetUpContainerPages/Page3/Page3";
import { iGameSettings, iKeysetScoreInfo } from "../interfaces/interfaces";
import "./css/setup.css";
import "../App.css";

export default function Setup() {
    const data = useContextData();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [gameData, setGameData] = useState<iGameSettings>({keyset:"", gameType:{type: null},optionAmount:"",cardType:"",inputType:""});
    const [keysetInfo, setKeysetInfo] = useState<iKeysetScoreInfo>({masteryLvl:0, avgAccuracy: 0, avgTime: 0, orderByScore: []});

    const pageNav = (direction: "forward" | "back") => {
        const newPage = direction === "forward" ? currentPage + 1 : currentPage - 1;
        setCurrentPage(newPage);

        // switch (newPage) {
        //     case 0 | 3 | 4:
        //         return null; 
        //     case 1:
        //         setPage2(null);
        //         break;
        //     case 2:
        //         setPage3(null)
        //         break;
        // }
    }

    const launchGame = () => {
        //console.log(gameData);
        let payload: iGameSettings = {
            keyset: gameData.keyset === "" ? data.contextState.defaultGameSettings.keyset : gameData.keyset,
            gameType: gameData.gameType.type === null ? {type:data.contextState.defaultGameSettings.gameType} : gameData.gameType, //CHECK PLEASE
            optionAmount: gameData.optionAmount === "" ? data.contextState.defaultGameSettings.optionAmount : gameData.optionAmount,
            cardType: gameData.cardType === "" ? data.contextState.defaultGameSettings.cardType : gameData.cardType,
            inputType: gameData.inputType === "" ? data.contextState.defaultGameSettings.inputType : gameData.inputType,
        }
        console.log(payload);
        data.contextDispatch({type:"update-game-settings", gameSettings:payload});
        navigate("/flashcards", {replace: true});  
    }


    return(
        <div>
            {currentPage === 1 && <SetUpPage1 onNoteInfoChange={setKeysetInfo} onGameDataChange={setGameData} pageNav={pageNav}/>}
            {currentPage === 2 && <SetUpPage2 keysetInfo={keysetInfo} pageNav={pageNav} launchGame={launchGame}/>}
            {currentPage === 3 && <SetUpPage3 gameInfo={gameData} setGameInfo={setGameData} pageNav={pageNav} launchGame={launchGame}/>}
        </div>
    );
}