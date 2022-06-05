interface Props {
    countDownNumber: number;
}

export default function FlashcardCountdown({countDownNumber}: Props) {

    return (
        <>
            {countDownNumber}
        </>
    );
}