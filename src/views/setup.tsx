import { useEffect, useState } from "react";
import { useContextData } from "../context/context";
import SetUpPage1 from "../components/SetUpContainerPages/Page1/Page1";
import SetUpPage2 from "../components/SetUpContainerPages/Page2/Page2";
import SetUpPage3 from "../components/SetUpContainerPages/Page3/Page3";
import { iGameSettings, iKeysetScoreInfo } from "../interfaces/interfaces";
import "./css/setup.css";
import "../App.css";

export default function Setup() {
    const data = useContextData();
    const [currentPage, setCurrentPage] = useState(1);
    const [gameData, setGameData] = useState<iGameSettings>(data.contextState.defaultGameSettings);
    const [keysetInfo, setKeysetInfo] = useState<iKeysetScoreInfo>({masteryLvl:0, avgAccuracy: 0, avgTime: 0, orderByScore: []});

    let pageNav = (direction: "forward" | "back") => {
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


    return(
        <div>
            {currentPage === 1 && <SetUpPage1 onNoteInfoChange={setKeysetInfo} pageNav={pageNav}/>}
            {currentPage === 2 && <SetUpPage2 keysetInfo={keysetInfo} pageNav={pageNav}/>}
            {currentPage === 3 && <SetUpPage3 />}
        </div>
    );
}