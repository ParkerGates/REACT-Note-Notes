
interface Props {
    image: any;
}

export default function FlashcardImage({image}: Props) {

    return (
        <div>
            { image &&
                <h1>{image}</h1>
            }
        </div>
    );
}