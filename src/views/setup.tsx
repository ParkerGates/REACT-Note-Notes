import { useEffect, useState } from "react";
import { useContextData } from "../context/context";
import SetUpPage1 from "../components/SetUpContainerPages/Page1/Page1";
import SetUpPage2 from "../components/SetUpContainerPages/Page2/Page2";
import SetUpPage3 from "../components/SetUpContainerPages/Page3/Page3";
import { iGameSettings, iNoteScoreInfo } from "../interfaces/interfaces";

export default function Setup() {
    const data = useContextData();
    const [currentPage, setCurrentPage] = useState(1);
    const [gameData, setGameData] = useState<iGameSettings>(data.contextState.defaultGameSettings);
    const [noteInfo, setNoteInfo] = useState<iNoteScoreInfo>({mastery:0, averageAcc: 0, averageTime: 0, bestToWorse: [], WorseAmount: 0});

    const [page1, setPage1] = useState(null);
    const [page2, setPage2] = useState(null);
    const [page3, setPage3] = useState(null);


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


    const disableNavBtn = (btnType: "forward" | "back", currentPage: number) => {
        switch (btnType) {
            case "forward":
                if (currentPage === 3) { return true}
                else { return false}
            case "back":
                if (currentPage === 1) { return true}
                else { return false}
        }
    }


    return(
        <div>
            {currentPage === 1 && <SetUpPage1 />}
            {currentPage === 2 && <SetUpPage2 />}
            {currentPage === 3 && <SetUpPage3 />}
            <div>
                <button disabled={disableNavBtn("back", currentPage)} onClick={()=>{pageNav("back")}}>back</button>
                <button disabled={disableNavBtn("forward", currentPage)} onClick={()=>{pageNav("forward")}}>forward</button>
            </div>
        </div>
    );
}