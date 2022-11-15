interface Props {
    countDownNumber: number;
}

export default function FlashcardCountdown({countDownNumber}: Props) {

    return (
        <>
            <h1 style={{fontSize:"80px"}}>{countDownNumber}</h1>
        </>
    );
}