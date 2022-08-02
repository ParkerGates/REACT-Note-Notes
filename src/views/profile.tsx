import React from 'react';
import DotsLong from "../svgs/DotsLong.svg";
import "./css/profile.css";

export default function Profile() {

    return (
        <div>
            <h1>Profile</h1>

            <div className="profileBg">
                <img className="dotsProfile" src={DotsLong} alt="dots" />
            </div>
        </div>
    );
}