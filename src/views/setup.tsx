import { useState } from "react";
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
    const [gameData, setGameData] = useState<iGameSettings>({
        keyset: "",
        gameType: {type: data.contextState.defaultGameSettings.gameType.type},
        optionAmount: data.contextState.defaultGameSettings.optionAmount,
        cardType: data.contextState.defaultGameSettings.cardType,
        inputType: data.contextState.defaultGameSettings.inputType
    });
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
        console.log(gameData);
        

        //data.contextDispatch({type:"update-game-settings", gameSettings:gameData});
        //navigate("/flashcards", {replace: true});  
    }


    return(
        <div>
            {currentPage === 1 && <SetUpPage1 onNoteInfoChange={setKeysetInfo} gameData={gameData} onGameDataChange={setGameData} pageNav={pageNav}/>}
            {currentPage === 2 && <SetUpPage2 keysetInfo={keysetInfo} pageNav={pageNav} launchGame={launchGame}/>}
            {currentPage === 3 && <SetUpPage3 gameInfo={gameData} setGameInfo={setGameData} pageNav={pageNav} launchGame={launchGame}/>}
        </div>
    );
}