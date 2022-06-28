import { useEffect, memo } from "react";
import { numberInput, arrowInput } from "../../../utilities/inputTypes";
import "./imageOptions.css";

interface Props {
    find: string;
    image: any;
    options: string[];
    inputType: string;
    handleSelectedOption: (rightIndex: string, selectedIndex: string) => void;
}


const FlashcardImageAndOptions = ({find, image, options, inputType, handleSelectedOption}: Props) => {
    const findIndex = options.indexOf(find);

    useEffect(()=> {
        switch (inputType) {
            case "number-keys":
                numberInput(options);
                break;
            case "arrow-keys":
                arrowInput(options);
                break;
        }
    })



    
    return (
        <div>
            <div>
                { image && <h1>{image}</h1> }
            </div>
            <div>
                { inputType === "mouse-click" &&
                    options.map((option, optionIndex) => {
                        return (
                            <button 
                                id={String(optionIndex)}
                                key={option}
                                onClick={() => {handleSelectedOption(`${findIndex}`,`${optionIndex}`)}}>
                                {option}
                            </button>
                    )})
                }

                { inputType === "number-keys" &&
                    options.map((option, optionIndex) => {
                        return (
                            <button
                                id={String(optionIndex)}
                                key={option}
                                onClick={() => {handleSelectedOption(`${findIndex}`,`${optionIndex}`)}}
                                >
                                {option}
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
                        >{options[0]}</button>
                        <div></div>

                        <button
                            id="1"
                            className="arrow-keys-tile"
                            onClick={() => {handleSelectedOption(`${findIndex}`,`${1}`)}}
                        >{options[1]}</button>
                        <button
                            id="3"
                            className="arrow-keys-tile"
                            onClick={() => {handleSelectedOption(`${findIndex}`,`${3}`)}}
                            disabled={options.length < 4 ? true : false}
                        >{options[3] || ""}</button>
                        <button
                            id="2"
                            className="arrow-keys-tile"
                            onClick={() => {handleSelectedOption(`${findIndex}`,`${2}`)}}
                        >{options[2]}</button>
                    </div>
                }
            </div>
        </div>
    );
}

export default memo(FlashcardImageAndOptions);