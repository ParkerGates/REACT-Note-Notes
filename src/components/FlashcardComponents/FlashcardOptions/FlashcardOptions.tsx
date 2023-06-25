import { useEffect, memo } from "react";
import { numberInput, arrowInput } from "../../../utilities/inputTypes";
import "./imageOptions.css";

interface Props {
    find: string;
    options: string[];
    lockedIn: boolean;
    inputType: string;
    handleSelectedOption: (rightIndex: string, selectedIndex: string) => void;
}


const FlashcardOptions = ({find, options, lockedIn, inputType, handleSelectedOption}: Props) => {
    const findIndex = options.indexOf(find);

    useEffect(()=> {

        return () => {
            document.removeEventListener("keyup", numberInput);
            document.removeEventListener("keyup", arrowInput);
        }
    }, [])

    useEffect(()=>{
        if (inputType === "number-keys") {
            document.addEventListener("keyup", numberInput);
        }
        else if (inputType === "arrow-keys") {
            document.addEventListener("keyup", arrowInput);
        }
    }, [options, inputType])



    
    return (
        <div>
            <div>
                { inputType === "mouse-click" &&
                    options.map((option, optionIndex) => {
                        return (
                            <button 
                                id={String(optionIndex)}
                                key={option + optionIndex}
                                className="btnPlain flashcardOptionBtns"
                                onClick={() => {handleSelectedOption(`${findIndex}`,`${optionIndex}`)}}
                                disabled={lockedIn}>
                                {option}
                            </button>
                    )})
                }

                { inputType === "number-keys" &&
                    options.map((option, optionIndex) => {
                        return (
                            <button
                                id={String(optionIndex)}
                                key={option + optionIndex}
                                className="btnPlain flashcardOptionBtns flashcardOptionNumberKeys"
                                onClick={() => {handleSelectedOption(`${findIndex}`,`${optionIndex}`)}}
                                disabled={lockedIn}>
                                    <span className="keyNumber">{optionIndex + 1}</span>
                                    <span>{option}</span>
                            </button>
                    )})
                }

                { inputType === "arrow-keys" &&
                    <div className="arrow-keys-grid">
                        <div></div>
                        <button
                            id="0"
                            className="arrow-keys-tile"
                            onClick={() => {handleSelectedOption(`${findIndex}`,`${0}`)}}
                            disabled={lockedIn}>
                                {options[0]}
                        </button>
                        <div></div>

                        <button
                            id="1"
                            className="arrow-keys-tile"
                            onClick={() => {handleSelectedOption(`${findIndex}`,`${1}`)}}
                            disabled={lockedIn}>
                                {options[1]}
                            </button>
                        <button
                            id="3"
                            className="arrow-keys-tile"
                            onClick={() => {handleSelectedOption(`${findIndex}`,`${3}`)}}
                            disabled={(options.length < 4 ? true : false) || lockedIn}>
                                {options[3] || ""}
                        </button>
                        <button
                            id="2"
                            className="arrow-keys-tile"
                            onClick={() => {handleSelectedOption(`${findIndex}`,`${2}`)}}
                            disabled={lockedIn}>
                                {options[2]}
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}

export default memo(FlashcardOptions);