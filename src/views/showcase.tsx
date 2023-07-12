import BoxSection from "../components/CssComp/BoxSection/BoxSection";
import GradientScrollElement from "../components/GradientScrollElement/GradientScrollElement";
import DotsLong from "../svgs/Background/DotsLong.svg";
import "./css/showcase.css";
import 'animate.css';

export default function Showcase() {

    return (
        <>
            <div className="showcasePageContainer">   
                <h1 className="showcasePageTitle">How To</h1>
                <div id="showcaseScroll" className="showcasePageContent">

                    <BoxSection title={"1: Log in"}>
                            <h3>Select Guest Account</h3>

                            <h3>OR Select Guest Account</h3>
                    </BoxSection>
                    <br />

                    <BoxSection title={"2: Create Game"}>
                            <h3>Go To Flashcard Page</h3>

                            <h3>Select Keyset</h3>

                            <h3>Select Test</h3>
                    </BoxSection>
                    <br />

                    <BoxSection title={"3: Testing"}>
                            <h3>Start Game</h3>

                            <h3>Guess Note</h3>
                            <p>CORRECT answer will light up in GREEN, WRONG answers will light up RED </p>

                            <h3>Review, Replay or Restart</h3>
                    </BoxSection>
                    <br />
                    
                </div>
            </div>



            <GradientScrollElement controlId="#showcaseScroll" />
            <img className="dotsReview" src={DotsLong} alt="dots" />
        </>
    );
}