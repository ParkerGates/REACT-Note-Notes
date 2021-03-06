import { Link } from 'react-router-dom';
import { iNote, iSingleGameStats } from '../../../interfaces/interfaces';
import './FlashcardEndScreen.css';

interface Props {
    stats: iSingleGameStats;
}

export default function FlashcardEndScreen({stats}: Props) {
    const testedNotes: iNote[] = Object.keys(stats) as iNote[];

    return(
        <div>
            <h1 className="endGameHeading">Well Done!</h1>

            <div className="endGameScoresContainer">
                { testedNotes.map((item) => {
                    return (
                        <div>
                            <span>{item} </span>
                            <span> {stats[item].right}-{stats[item].amount} </span>
                            <span> {stats[item].right / stats[item].amount * 100}</span>
                        </div>
                    );
                })}
            </div>

            <div className="endGameBtnContainer">
            <Link to="/"><button className="endGameHomeBtn">Home</button></Link>

                <div className="endGameReplayContainer">
                    <div>Play Again?</div>
                    <div>
                        <Link to="/reloads/flashcards"><button>Replay</button></Link>
                        <Link to="/setup"><button>New Game</button></Link>
                    </div>
                </div>

            </div>
        </div>
    );
}