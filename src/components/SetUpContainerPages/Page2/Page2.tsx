import { iKeysetScoreInfo } from '../../../interfaces/interfaces';
import './css/Page2.css';
import '../../../App.css';

interface Props {
    keysetInfo: iKeysetScoreInfo;
    pageNav: (direction: "forward" | "back") => void;
    launchGame: () => void;
}

export default function SetUpPage2({keysetInfo, pageNav, launchGame}: Props) {

    return (
        <div className="page2Container positionRelative">

            <div className='page2Block'>
                <div className='MasteryAverageContainer'>
                    <div className='MasteryAverageText'>Mastery Level</div>
                    <input className='btnPlain MasteryAverageTextBox' type="text" value={`${100 - keysetInfo.masteryLvl}%`} readOnly />
                </div>
            </div>

            <div className="page2Block">
                    <div className='MasteryAverageContainer'>
                    <div className='MasteryAverageText'>Average Accuracy</div>
                    <input className='btnPlain MasteryAverageTextBox' type="text" value={`${keysetInfo.avgAccuracy}%`} readOnly />
                </div>

                <div className='MasteryAverageContainer'>
                    <div className='MasteryAverageText'>Average Time</div>
                    <input className='btnPlain MasteryAverageTextBox' type="text" value={`${keysetInfo.avgTime}s`} readOnly />
                </div>
            </div>


            <div className='avgTitleContainer'>
                <h2 className="avgTitle">Avg Accuracy & Recall</h2>
                <hr className="avgHr"/>
            </div>

            <div className="avgAccuracyRecallBlock">
                { keysetInfo.orderByScore.length === 0
                    ?   <div className="page2Block displayFlexCenter">
                            <pre className='moreTestingRequired'>Test More To See Score...</pre>
                        </div>

                    :   <div className="singleNoteScoreInfoContainer page2Block">
                            {keysetInfo.orderByScore.map((note)=> {
                                return (
                                    <div key={note.note} className="scoreDisplayBoxContainer">
                                        <span>{note.note}: </span>
                                        <div className="displayInlineBlock">
                                            <div className="scoreDisplayBox scoreDisplayBoxLeft">{note.acc}%</div>
                                            <div className="scoreDisplayBox scoreDisplayBoxRight">{note.avgTime}s</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                }

                <div className="positionRelative bottomNavBtns">
                    <button className="backbtn" onClick={()=>{pageNav("back")}}>{"<"}</button>

                    <div className="gameInfoTestBtnContainer">
                        <button className="btnPlain gameInfoBtn" onClick={()=>{pageNav("forward")}}>Config</button>
                        <button className="btnGradiant testBtn" onClick={launchGame}>Test</button>
                    </div>
                </div>
            </div>
        </div>
    )
}