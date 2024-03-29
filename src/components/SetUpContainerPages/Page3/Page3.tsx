import { useState } from 'react';
import { useContextData, useFirestoreData } from "../../../context/context";
import { iGameSettings, iKeysetScoreInfo } from '../../../interfaces/interfaces';
import { firebaseDefaultsUPDATE } from '../../../firebase/firebase';
import './css/Page3.css';

interface Props {
    keysetInfo: iKeysetScoreInfo;
    gameInfo: iGameSettings;
    setGameInfo: Function;
    pageNav: (direction: "forward" | "back") => void;
    launchGame: () => void;
}

export default function SetUpPage3({keysetInfo, gameInfo, setGameInfo, pageNav, launchGame}: Props) {
    const fbd = useFirestoreData();
    const contextData = useContextData();

    const [btnState, setBtnState] = useState({
        gameType: contextData.contextState.defaultGameSettings.gameType.type,
        optionAmount: contextData.contextState.defaultGameSettings.optionAmount,
        cardType: contextData.contextState.defaultGameSettings.cardType,
        inputType: contextData.contextState.defaultGameSettings.inputType,
        gameInfoChanged: null
    });
    const [limitedGameCount, setLimitedGameCount] = useState<number>(20);
    const [timedGameCount, setTimedGameCount] = useState<number>(3);


    const setSettingOption = (catagory:string, type:string|number) => {
        switch (catagory) {
            case "GameType":
                setGameInfo({...gameInfo, gameType:{type:type, action:gameTypeDefaultActionIndex(type)}});
                setBtnState({...btnState, gameType:type, gameInfoChanged:true});
                break;
            case "OptionAmount":
                setGameInfo({...gameInfo, optionAmount:type});
                setBtnState({...btnState, optionAmount:type, gameInfoChanged:true});
                //!!-------------------------
                break;
            case "CardType":
                setGameInfo({...gameInfo, cardType:type});
                setBtnState({...btnState, cardType:type, gameInfoChanged:true});
                break;
            case "InputType":
                if (btnState.optionAmount > 4 && type === "arrow-keys") {
                    setGameInfo({...gameInfo, inputType:type, optionAmount:4});
                    setBtnState({...btnState, inputType:type, optionAmount:4, gameInfoChanged:true});
                }
                else {
                    setGameInfo({...gameInfo, inputType:type});
                    setBtnState({...btnState, inputType:type, gameInfoChanged:true});
                }
                break;
        }
    }


    const saveAsDefault = () => {
        setBtnState({...btnState, gameInfoChanged:false});
        contextData.contextDispatch({type:"update-default-game-settings", gameSettings:gameInfo});

        const id: string = fbd.user.uid;
        firebaseDefaultsUPDATE(fbd.db, id, gameInfo);

        const myTimeout = setTimeout(() => {
            setBtnState({...btnState, gameInfoChanged:null});
        }, 3000);
    }


    const setCardIncrement = (action: "increment" | "decrement") => {
        switch (action) {
            case "increment":
                if (limitedGameCount < 100) {
                    setGameInfo({...gameInfo, gameType:{...gameInfo.gameType, action: limitedGameCount + 10}});
                    setLimitedGameCount(limitedGameCount + 10);
                }
                return;
            case "decrement":
                if (limitedGameCount > 10) {
                    setGameInfo({...gameInfo, gameType:{...gameInfo.gameType, action: limitedGameCount - 10}});
                    setLimitedGameCount(limitedGameCount - 10);
                }
                return;
        }
    }


    const setTimeIncrement = (action: "increment" | "decrement") => {
        switch (action) {
            case "increment":
                if (timedGameCount < 10) {
                    setGameInfo({...gameInfo, gameType:{...gameInfo.gameType, action: timedGameCount + 1}});
                    setTimedGameCount(timedGameCount + 1);
                }
                    return;
            case "decrement":
                if (timedGameCount > 1) {
                    setGameInfo({...gameInfo, gameType:{...gameInfo.gameType, action: timedGameCount - 1}});
                    setTimedGameCount(timedGameCount - 1);
                }
                    return;
        }
    }


    const gameTypeDefaultActionIndex = (gameType:"limitless"|"timed"|"set"|any) => {
        switch(gameType) {
            case "limitless":
                return null;
            case "timed":
                setTimedGameCount(3);
                return 3;
            case "set":
                setTimedGameCount(20);
                return 20;
            default:
                return null;
        }

    }




    return (
        <div className="page3Container">
            <div className="configFullForm">
                <div>
                    <div className="configTitleContainer">
                        <h2 className="configTitle">Game Type</h2>
                        <hr className="configHr" />
                    </div>
                    <div className="configbtnContainer">
                        <button className={`btnPlain configbtn ${btnState.gameType==="limitless"?"active":""}`} onClick={()=>{setSettingOption("GameType","limitless")}}>limitless</button>
                        <button className={`btnPlain configbtn ${btnState.gameType==="timed"?"active":""}`} onClick={()=>{setSettingOption("GameType","timed")}}>timed</button>
                        <button className={`btnPlain configbtn ${btnState.gameType==="set"?"active":""}`} onClick={()=>{setSettingOption("GameType","set")}}>set</button>
                        
                        { btnState.gameType === "timed" &&
                        <div className="configSpecificsContainer">
                            <label className="configSpecificsTitle">Time</label>
                            <input type="text" className="configSpecificsInput" value={`${timedGameCount}m`} readOnly />{/*--------------------------------------------------------------*/}
                            <button
                                className="btnPlain configSpecificsBtn"
                                onClick={()=>setTimeIncrement('decrement')}
                                >&and;
                            </button>
                            <button 
                                className="btnPlain configSpecificsBtn"
                                onClick={()=>setTimeIncrement('increment')}
                                >&or;
                            </button>
                        </div>
                        }
                        { btnState.gameType === "set" &&
                        <div className="configSpecificsContainer">
                            <label className="configSpecificsTitle">Cards</label>
                            <input type="text" className="configSpecificsInput" value={limitedGameCount} readOnly />{/*--------------------------------------------------------------*/}
                            <button
                                className="btnPlain configSpecificsBtn"
                                onClick={()=>setCardIncrement('decrement')}
                                >&and;
                            </button>
                            <button
                                className="btnPlain configSpecificsBtn"
                                onClick={()=>setCardIncrement('increment')}
                                >&or;
                            </button>
                        </div>
                        }
                    </div>
                </div>

                <br/>

                <div>
                    <div className="configTitleContainer">
                        <h2 className="configTitle">Option Amount</h2>
                        <hr className="configHr" />
                    </div>
                    <div className="configbtnContainer">
                        <button
                            className={`btnPlain configbtn ${btnState.optionAmount === 3?"active":""}`}
                            onClick={()=>{setSettingOption("OptionAmount",3)}}>
                                3
                            </button>
                        <button
                            className={`btnPlain configbtn ${btnState.optionAmount === 4?"active":""}`}
                            onClick={()=>{setSettingOption("OptionAmount",4)}}>
                                4
                            </button>
                        <button
                            className={`btnPlain configbtn ${btnState.optionAmount === 5?"active":""}
                                        ${btnState.inputType === "arrow-keys" && "btnDisabled"}`}
                            onClick={()=>{setSettingOption("OptionAmount",5)}}
                            disabled={btnState.inputType === "arrow-keys" ? true : false}>
                                5
                            </button>
                        <button
                            className={`btnPlain configbtn ${btnState.optionAmount === 6?"active":""}
                                        ${btnState.inputType === "arrow-keys" && "btnDisabled"}`}
                            onClick={()=>{setSettingOption("OptionAmount",6)}}
                            disabled={btnState.inputType === "arrow-keys" ? true : false}>
                                6
                            </button>
                    </div>
                </div>

                <br/>

                <div>
                    <div className="configTitleContainer">
                        <h2 className="configTitle">Card Type</h2>
                        <hr className="configHr" />
                    </div>
                    <div className="configbtnContainer">
                        <button
                            className={`btnPlain configbtn ${btnState.cardType==="all"?"active":""}`} onClick={()=>{setSettingOption("CardType","all")}}
                            >all
                        </button>
                        <button
                            className={`btnPlain configbtn configbtnLong ${btnState.cardType==="trouble"?"active":""} ${keysetInfo.orderByScore.length === 0 && 'btnDisabled'}`}
                            onClick={()=>{setSettingOption("CardType","trouble")}}
                            disabled={keysetInfo.orderByScore.length === 0}
                            >trouble only
                        </button>
                    </div>
                </div>

                <br/>

                <div>
                    <div className="configTitleContainer">
                        <h2 className="configTitle">Input Type</h2>
                        <hr className="configHr" />
                    </div>
                    <div className="configbtnContainer">
                        <button
                            className={`btnPlain configbtn configbtnLong ${btnState.inputType==="mouse-click"?"active":""}`}
                            onClick={()=>{setSettingOption("InputType","mouse-click")}}
                            >mouse-click
                        </button>
                        <button
                            className={`btnPlain configbtn configbtnLong ${btnState.inputType==="number-keys"?"active":""}`}
                            onClick={()=>{setSettingOption("InputType","number-keys")}}
                            >number-keys
                        </button>
                        <button
                            className={`btnPlain configbtn configbtnLong ${btnState.inputType==="arrow-keys"?"active":""}`}
                            onClick={()=>{setSettingOption("InputType","arrow-keys")}}
                            >arrow-keys
                        </button>
                    </div>

                    <div className="configbottomNavBtns">
                        <button className="backbtn" onClick={()=>{pageNav("back")}}>{"<"}</button>
                        <div className="configTestBtnContainer">
                            <span className="configSaveSettings">                        
                                { btnState.gameInfoChanged === null && ""}
                                { btnState.gameInfoChanged === false && <span>saved</span> }
                                { btnState.gameInfoChanged === true && 
                                    <>
                                        <span id="setAsDefault" style={{zIndex:"1"}}>Set final as default</span>
                                        <button
                                            className="btnPlain configSaveBtn"
                                            onClick={saveAsDefault}
                                            >+
                                        </button>
                                    </>
                                }
                                <button
                                    className="btnGradiant configTestBtn"
                                    onClick={launchGame}
                                    >Test
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}