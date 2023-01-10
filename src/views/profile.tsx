import { useState } from 'react';
import withFireBase from '../hoc/firebaseHOC';
import BoxSection from '../components/CssComp/BoxSection/BoxSection';
import ProfileImg from "../svgs/Images/profileImage.svg";
import Checkmark from "../svgs/Images/checkmark.svg";
import DotsLong from "../svgs/Background/DotsLong.svg";
import BotProfile from "../svgs/Background/BotProfile.svg";
import TitleHR from '../components/CssComp/TitleHR/TitleHR';
import Lock from "../components/CssComp/Lock/Lock";
import "./css/profile.css";
import "../App.css";

function Profile(props) {
    const [lock, setLock] = useState<boolean>(true);

    const logOut = () => {
        console.log("Log Out");
    }

    const resetAccount = () => {
        console.log("Reset Account");
    }

    const deleteAccount = () => {
        console.log("Delete Account");
    }

    return (
        <div className="containerProfile">
            <div className="contentProfile">
                {/* <div className="profilePageProfileImgAndNameContainer">
                    <img className="profilePageProfileImg" src={ProfileImg} alt="profile image" />
                    <h1 className="profilePageUsernameHeading">Parker Gates</h1>
                </div> */}

                <div className="profilePageSections">
                    <TitleHR title="Masteries" fontSize="h2" />
                    <div className="profileNoteInfoBubble">
                        <span className="profileNoteInfoTitle">Treble</span>
                        <hr className="profileNoteInfoHr" />
                        <img className="profileNoteInfoCheck" src={Checkmark} alt="checkmark" />
                    </div>
                </div>



                <div className="profilePageSections">
                    <TitleHR title="Progress" fontSize="h2" />
                    <div className="profileNoteInfoBubble">
                        <span className="profileNoteInfoTitle">Treble</span>
                        <span className="profileNoteInfoTitle">95%</span>
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
                                onClick={resetAccount}
                                className="profileResetBtn"
                                disabled={lock}
                                >Reset Account
                            </button>
                            <button
                                onClick={deleteAccount}
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
    );
}

export default withFireBase(Profile)