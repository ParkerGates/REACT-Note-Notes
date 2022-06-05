interface Props {
    startGameCountdown: () => void;
}

export default function FlashcardStartButton({startGameCountdown}: Props) {
    return (
        <div>
            <button onClick={startGameCountdown}>Start</button>
        </div>
    );
}