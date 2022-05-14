import { useState } from "react";
import SetUpPage1 from "../SetUpContainerPages/Page1/Page1";
import SetUpPage2 from "../SetUpContainerPages/Page2/Page2";
import SetUpPage3 from "../SetUpContainerPages/Page3/Page3";

export default function SetUpContainer() {
    let [currentPage, setCurrentPage] = useState(1);
    let [disableArrows, setDisableArrows] = useState({back:true,forward:false});

    let [page1, setPage1] = useState(null);
    let [page2, setPage2] = useState(null);
    let [page3, setPage3] = useState(null);


    let pageNav = (direction: "forward" | "back") => {
        let newPage = direction === "forward" ? currentPage + 1 : currentPage - 1;

        switch (newPage) {
            case 0:
            case 4:
                return null; 
            case 1:
                setDisableArrows({back:true,forward:false})
                setPage2(null);
                break;
            case 2:
                setDisableArrows({back:false,forward:false})
                setPage3(null)
                break;
            case 3:
                setDisableArrows({back:false,forward:true})
                break;
        }
        setCurrentPage(newPage)
    }


    function handlePageData(page: string, value: any) {
        switch(page) {
            case "page1":
                setPage1(value);
                break;
            case "page2":
                setPage2(value);
                break;
            case "page3":
                setPage3(value);
                break;
        }
    }


    return(
        <div>
            {currentPage === 1 && <SetUpPage1 content={page1} contentHandler={handlePageData}/>}
            {currentPage === 2 && <SetUpPage2 content={page2} contentHandler={handlePageData}/>}
            {currentPage === 3 && <SetUpPage3 content={page3} contentHandler={handlePageData}/>}
            <div>
                <button disabled={disableArrows.back} onClick={()=>{pageNav("back")}}>back</button>
                <button disabled={disableArrows.forward} onClick={()=>{pageNav("forward")}}>forward</button>
            </div>
        </div>
    );
}