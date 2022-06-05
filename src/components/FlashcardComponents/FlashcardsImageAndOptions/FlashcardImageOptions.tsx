import { useEffect } from "react";
import { numberInput } from "../../../utilities/inputTypes";

interface Props {
    find: string;
    image: any;
    options: string[];
    handleSelectedOption: (rightIndex: string, selectedIndex: string) => void;
}


export default function FlashcardImageAndOptions({find, image, options, handleSelectedOption}: Props) {
    const findIndex = options.indexOf(find);

    useEffect(()=> {
        numberInput(options);
    })

    
    return (
        <div>
            <div>
                { image && <h1>{image}</h1> }
            </div>
            <div>
                { options.map((option, optionIndex) => {
                    return (
                        <button id={String(optionIndex)} key={option} onClick={() => {handleSelectedOption(`${findIndex}`,`${optionIndex}`)}}>{option}</button>
                    );
                })}
            </div>
        </div>
    );
}