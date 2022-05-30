import { numberInput } from "../../../utilities/inputTypes";

interface Props {
    find: string;
    options: string[];
    selectOption: (right: string, selected: string) => void;
}

export default function FlashcardOptions({find, options, selectOption}: Props) {


        numberInput(options);


    return (
        <div>
            {options.map((option) => {
                return (
                    <button id={option} key={option} onClick={() => {selectOption(find,option)}}>{option}</button>
                );
            })}
        </div>
    );
}