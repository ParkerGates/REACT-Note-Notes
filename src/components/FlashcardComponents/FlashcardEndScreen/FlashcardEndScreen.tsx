import { useEffect } from 'react';
import { useContextData, useFirestoreData } from '../../../context/context';
import { iNote, iSingleGameStats } from '../../../interfaces/interfaces';
import { firebaseDataUPDATE } from '../../../firebase/firebase';
import './FlashcardEndScreen.css';

interface Props {
    stats: iSingleGameStats;
}

export default function FlashcardEndScreen({stats}: Props) {
    let fbd = useFirestoreData();
    let context = useContextData();

    const testedNotes: iNote[] = Object.keys(stats) as iNote[];

    useEffect(() => {
        if (fbd.user !== null) {
            let id: string = fbd.user.uid;
            const myTimeout = setTimeout(() => {
                firebaseDataUPDATE(fbd.db, id, context.contextState.noteData);
            }, 1000);
        }
    }, []);
    
    return(
        <div className="endGameContainer">
            <h1 className="endGameHeading">Well Done!</h1>

            <div className="endGameScoresContainer">
                { testedNotes.map((item) => {
                    return (
                        <div className="endGameNoteScoreContainer" key={item}>
                            <span className="endGameNoteScoreItem endGameScoreLeft">{item} </span>
                            <span className="endGameNoteScoreItem"> {stats[item].right}/{stats[item].amount} </span>
                            <span className="endGameNoteScoreItem endGameScoreRight"> {Math.floor(stats[item].right / stats[item].amount * 100)}%</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}