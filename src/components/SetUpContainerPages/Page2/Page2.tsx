import { iKeysetScoreInfo } from '../../../interfaces/interfaces';
import './css/Page2.css';
import '../../../App.css';

interface Props {
    keysetInfo: iKeysetScoreInfo;
    pageNav: (direction: "forward" | "back") => void;
}

export default function SetUpPage2({keysetInfo, pageNav}: Props) {

    return (
        <div className="page2Container positionRelative">

            <div className='textAlignCenter page2Block'>
                <div className='MasteryAverageContainer'>
                    <input className='MasteryAverageTextBox' type="text" value={`${keysetInfo.masteryLvl}%`} readOnly />
                    <div className='MasteryAverageText'>Mastery Level</div>
                </div>
            </div>

            <div className="textAlignCenter page2Block">
                <div className='MasteryAverageContainer'>
                    <input className='MasteryAverageTextBox' type="text" value={`${keysetInfo.avgAccuracy}%`} readOnly />
                    <div className='MasteryAverageText'>Average Accuracy</div>
                </div>

                <div className='MasteryAverageContainer'>
                    <input className='MasteryAverageTextBox' type="text" value={`${keysetInfo.avgTime}s`} readOnly />
                    <div className='MasteryAverageText'>Average Time</div>
                </div>
            </div>

            { keysetInfo.orderByScore.length === 0
                ?   <div className="page2Block">
                        <pre className='moreTestingRequired'>Test More To See Score...</pre>
                    </div>

                :   <div className="singleNoteScoreInfoContainer page2Block">
                        {keysetInfo.orderByScore.map((note)=> {
                            return (
                                <div key={note.note} className="displayInlineBlock scoreDisplayBoxContainer">
                                    <span>{note.note}: </span>
                                    <div className="displayInlineBlock">
                                        <div className="scoreDisplayBox">{note.acc}</div>
                                        <div className="scoreDisplayBox">{note.avgTime}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
            }

            <div className="positionRelative">
                <div className="configTestBtnContainer">
                    <button onClick={()=>{pageNav("forward")}}>Config</button>
                    <button>Test</button>
                </div>
            </div>

            <button className="backBtn" onClick={()=>{pageNav("back")}}>{"<"}</button>
        </div>
    )
}