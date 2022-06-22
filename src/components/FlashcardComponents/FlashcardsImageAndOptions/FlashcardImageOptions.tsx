import { useEffect, memo } from "react";
import { numberInput } from "../../../utilities/inputTypes";

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
        console.log(inputType);
        switch (inputType) {
            case "number-keys":
                numberInput(options);
                break;
            case "hover-wheel":
                //numberInput(options);
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

                { inputType === "hover-wheel" &&
                    <div></div>
                }
            </div>
        </div>
    );
}

export default memo(FlashcardImageAndOptions);