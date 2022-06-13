import { useState } from 'react';
import { useContextData } from "../../../context/context";
import { iGameSettings } from '../../../interfaces/interfaces';
import './css/Page3.css';
import '../Page2/css/Page2.css';

interface Props {
    gameInfo: iGameSettings;
    setGameInfo: Function;
    pageNav: (direction: "forward" | "back") => void;
    launchGame: () => void;
}

export default function SetUpPage3({gameInfo, setGameInfo, pageNav, launchGame}: Props) {
    const contextData = useContextData();
    const [btnState, setBtnState] = useState({
        gameType: contextData.contextState.defaultGameSettings.gameType.type,
        optionAmount: contextData.contextState.defaultGameSettings.optionAmount,
        cardType: contextData.contextState.defaultGameSettings.cardType,
        inputType: contextData.contextState.defaultGameSettings.inputType,
        gameInfoChanged: null
    });

    const setSettingOption = (catagory:string, type:string) => {
        switch (catagory) {
            case "GameType":
                setGameInfo({...gameInfo, gameType:{type:type}});
                setBtnState({...btnState, gameType:type, gameInfoChanged:true});
                break;
            case "OptionAmount":
                setGameInfo({...gameInfo, optionAmount:type});
                setBtnState({...btnState, optionAmount:type, gameInfoChanged:true});
                break;
            case "CardType":
                setGameInfo({...gameInfo, cardType:type});
                setBtnState({...btnState, cardType:type, gameInfoChanged:true});
                break;
            case "InputType":
                setGameInfo({...gameInfo, inputType:type});
                setBtnState({...btnState, inputType:type, gameInfoChanged:true});
                break;
        }
    }

    const saveAsDefault = () => {
        setBtnState({...btnState, gameInfoChanged:false});
        contextData.contextDispatch({type:"update-default-game-settings", gameSettings:gameInfo});
    }





    return (
        <div>
            <div>Page 3</div>
            <div>
                <div>Game Type:</div>
                <div>
                    <button className={btnState.gameType==="limitless"?"active":""} onClick={()=>{setSettingOption("GameType","limitless")}}>limitless</button>
                    <button className={btnState.gameType==="timed"?"active":""} onClick={()=>{setSettingOption("GameType","timed")}}>timed</button>
                    <button className={btnState.gameType==="set"?"active":""} onClick={()=>{setSettingOption("GameType","set")}}>set</button>
                </div>
            </div>
            <br/>
            <div>
                <div>Option Amount:</div>
                <div>
                    <button className={btnState.optionAmount === "3"?"active":""} onClick={()=>{setSettingOption("OptionAmount","3")}}>3</button>
                    <button className={btnState.optionAmount === "4"?"active":""} onClick={()=>{setSettingOption("OptionAmount","4")}}>4</button>
                    <button className={btnState.optionAmount === "5"?"active":""} onClick={()=>{setSettingOption("OptionAmount","5")}}>5</button>
                    <button className={btnState.optionAmount === "6"?"active":""} onClick={()=>{setSettingOption("OptionAmount","6")}}>6</button>
                </div>
            </div>
            <br/>
            <div>
                <div>Card Type:</div>
                <div>
                    <button className={btnState.cardType==="all"?"active":""} onClick={()=>{setSettingOption("CardType","all")}}>all</button>
                    <button className={btnState.cardType==="trouble"?"active":""} onClick={()=>{setSettingOption("CardType","trouble")}}>lowest 8</button>
                </div>
            </div>
            <br/>
            <div>
                <div>Input Type:</div>
                <div>
                    <button className={btnState.inputType==="mouse-click"?"active":""} onClick={()=>{setSettingOption("InputType","mouse-click")}}>mouse-click</button>
                    <button className={btnState.inputType==="number-keys"?"active":""} onClick={()=>{setSettingOption("InputType","number-keys")}}>number-keys</button>
                    <button className={btnState.inputType==="hover-wheel"?"active":""} onClick={()=>{setSettingOption("InputType","hover-wheel")}}>hover-wheel</button>
                </div>
            </div>

            <div className="positionRelative">
                <div className="configTestBtnContainer">
                    <span>                        
                        { btnState.gameInfoChanged === null && ""}
                        { btnState.gameInfoChanged === false && <>saved</> }
                        { btnState.gameInfoChanged === true && 
                            <>
                                <label>Set final as default</label>
                                <button onClick={saveAsDefault}>+</button>
                            </>
                        }
                    </span>
                    <button onClick={launchGame}>Test</button>
                </div>
            </div>
            <button className="backBtn" onClick={()=>{pageNav("back")}}>{"<"}</button>
        </div>
    )
}