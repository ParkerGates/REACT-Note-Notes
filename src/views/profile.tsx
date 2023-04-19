import { useState } from 'react';
import { getKeysetProgress } from "../utilities/utilities";
import withFireBase from '../hoc/firebaseHOC';
import { useContextData, useFirestoreData } from '../context/context';
import ProfileImg from "../svgs/Images/profileImage.svg";
import Checkmark from "../svgs/Images/checkmark.svg";
import DotsLong from "../svgs/Background/DotsLong.svg";
import BotProfile from "../svgs/Background/BotProfile.svg";
import TitleHR from '../components/CssComp/TitleHR/TitleHR';
import Lock from "../components/CssComp/Lock/Lock";
import "./css/profile.css";
import "../App.css";

function Profile(props) {
    let fsd = useFirestoreData();
    let context = useContextData();
    const trebleProgress = getKeysetProgress(context, "treble");
    const bassProgress = getKeysetProgress(context, "bass");

    const [lock, setLock] = useState<boolean>(true);


    return (
        <>
        <div className="containerProfile">
            <div className="contentProfile">

            <div className="profilePageProfileImgAndNameContainer">
                <img className="profilePageProfileImg" src={ProfileImg} alt="profile image" />
                <h1 className="profilePageUsernameHeading">{fsd.user !== null ? fsd.user.displayName : "Guest"}</h1>
            </div>

                <div className="profilePageSections">
                    <TitleHR title="Masteries" fontSize="h2" />


                    { trebleProgress > 85 && <div className="profileNoteInfoBubble">
                        <span className="profileNoteInfoTitle">Treble</span>
                        <hr className="profileNoteInfoHr" />
                        <img className="profileNoteInfoCheck" src={Checkmark} alt="checkmark" />
                    </div>
                    }
                    { bassProgress > 85 && <div className="profileNoteInfoBubble">
                        <span className="profileNoteInfoTitle">Bass</span>
                        <hr className="profileNoteInfoHr" />
                        <img className="profileNoteInfoCheck" src={Checkmark} alt="checkmark" />
                    </div>
                    }
                    { trebleProgress < 85 && bassProgress < 85 && <div className="profileNoteInfoBubble profileNoMasteies">
                        
                        <div className="profileNoMasteriesText">No Masteries . . .</div>

                    </div>
                    }

                </div>

                <div className="profilePageSections">
                    <TitleHR title="Progress" fontSize="h2" />
                    <div className="profileNoteInfoBubble">
                        <span className="profileNoteInfoTitle">Treble</span>
                        <span className="profileNoteInfoTitle">{`${trebleProgress}%`}</span>
                    </div>
                    <div className="profileNoteInfoBubble">
                        <span className="profileNoteInfoTitle">Bass</span>
                        <span className="profileNoteInfoTitle">{`${bassProgress}%`}</span>
                    </div>
                </div>

                <div className="profilePageSections">
                    <TitleHR title="Settings" fontSize="h2" />
                    <div className="profileSettingsContainer">
                        <button
                            onClick={props.signOut}
                            className="profileLogOutBtn"
                            >Log Out
                        </button>
                        <div className="profileDangerZoneContainer">
                            <span className="profileDangerZoneControl">
                                <span className="dangerZoneTitle">Danger Zone</span>
                                <Lock lockState={lock} setLockState={setLock} />
                            </span>
                            <button
                                onClick={props.resetAccount}
                                className="profileResetBtn"
                                disabled={lock}
                                >Reset Account
                            </button>
                            <button
                                onClick={props.deleteAccount}
                                className="profileDeleteBtn"
                                disabled={lock}
                                >Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profileBg">
                <img className="dotsProfile" src={DotsLong} alt="dots" />
                <img className="botProfile" src={BotProfile} alt="gradiant slope" />
            </div>
        </div>

        </>
    );
}

export default withFireBase(Profile)