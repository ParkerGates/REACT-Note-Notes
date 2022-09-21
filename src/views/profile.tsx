import React from 'react';
import BoxSection from '../components/CssComp/BoxSection/BoxSection';
import DotsLong from "../svgs/DotsLong.svg";
import BotProfile from "../svgs/BotProfile.svg";
import "./css/profile.css";

export default function Profile() {

    return (
        <div className="containerProfile">
            <div className="contentProfile">
                testing
            </div>

            <div className="profileBg">
                <img className="dotsProfile" src={DotsLong} alt="dots" />
                <img className="botProfile" src={BotProfile} alt="gradiant slope" />
            </div>
        </div>
    );
}