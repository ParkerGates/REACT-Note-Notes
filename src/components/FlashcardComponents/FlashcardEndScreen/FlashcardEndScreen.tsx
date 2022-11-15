import { Link } from 'react-router-dom';
import { iNote, iSingleGameStats } from '../../../interfaces/interfaces';
import './FlashcardEndScreen.css';

interface Props {
    stats: iSingleGameStats;
}

export default function FlashcardEndScreen({stats}: Props) {
    const testedNotes: iNote[] = Object.keys(stats) as iNote[];

    return(
        <div className="endGameContainer">
            <h1 className="endGameHeading">Well Done!</h1>

            <div className="endGameScoresContainer">
                { testedNotes.map((item) => {
                    return (
                        <div className="endGameNoteScoreContainer">
                            <span>{item} </span>
                            <span> {stats[item].right}-{stats[item].amount} </span>
                            <span> {Math.floor(stats[item].right / stats[item].amount * 100)}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}