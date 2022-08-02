import React from 'react';
import DotsLong from "../svgs/DotsLong.svg";
import "./css/review.css";

export default function Review() {

    return (
        <div>
            <h1>Review</h1>

            <div className="reviewBg">
                <img className="dotsReview" src={DotsLong} alt="dots" />
            </div>
        </div>
    );
}