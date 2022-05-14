import FlashcardGame from "../classes/FlashcardGame";

export default function Flashcards() {
    let test = new FlashcardGame("treble")
    test.getNote();

    return(
        <div>
            <h4>Flashcards</h4>
            <button>Class Test</button>
        </div>
    );
}