import React from 'react';
import BoxSection from '../components/CssComp/BoxSection/BoxSection';
import DotsLong from "../svgs/DotsLong.svg";
import Highest from "../svgs/Review/Highest.svg"
import HighTreble from "../svgs/Review/HighTreble.svg"
import Treble from "../svgs/Review/Treble.svg"
import Bass from "../svgs/Review/Bass.svg"
import LowerBass from "../svgs/Review/LowerBass.svg"
import "./css/review.css";

export default function Review() {

    return (
        <>
            <div className="reviewPageContainer">   
                <h1 className="reviewPageTitle">Review</h1>
                <div className="reviewPageContent">

                    <BoxSection title={"Treble"} fontSize={"h3"}>
                        <div className="ReviewImageContainer">
                            <img className="ReviewImage" src={Treble} alt="treble review" />
                        </div>
                    </BoxSection>
                    <br />
                    <BoxSection title={"Bass"} fontSize={"h3"}>
                        <div className="ReviewImageContainer">
                            <img className="ReviewImage" src={Bass} alt="bass review" />
                        </div>
                    </BoxSection>
                    <br />
                    <BoxSection title={"High Treble"} fontSize={"h3"}>
                        <div className="ReviewImageContainer">
                            <img className="ReviewImage" src={HighTreble} alt="high treble review" />
                        </div>
                    </BoxSection>
                    <br />
                    <BoxSection title={"Low Base"} fontSize={"h3"}>
                        <div className="ReviewImageContainer">
                            <img className="ReviewImage" src={LowerBass} alt="lower bass review" />
                        </div>
                    </BoxSection>
                    <br />
                    <BoxSection title={"Highest"} fontSize={"h3"}>
                        <div className="ReviewImageContainer">
                            <img className="ReviewImage" src={Highest} alt="highest note review" />
                        </div>
                    </BoxSection>
                    <br />
                </div>
            </div>
            <div className="reviewBg">
                <img className="dotsReview" src={DotsLong} alt="dots" />
            </div>
        </>
    );
}

// Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque efficitur leo a nisi porttitor, at convallis dolor mattis. Aenean et laoreet eros, non blandit tellus. Fusce vel sagittis turpis, vel commodo eros. Curabitur mattis aliquet erat, vitae pulvinar urna facilisis ut. Nullam efficitur varius est at tincidunt. Cras vehicula lorem nec pellentesque interdum. Donec aliquet mollis neque, nec rhoncus nunc venenatis in. Curabitur ut lectus in nunc faucibus luctus eget et dui. Praesent a tempor elit. Mauris pulvinar vel erat vitae varius. Pellentesque fermentum augue quis nisi mattis aliquam. Proin magna metus, volutpat quis augue eu, ultricies dapibus odio.