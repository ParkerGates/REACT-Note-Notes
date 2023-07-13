import BoxSection from "../components/CssComp/BoxSection/BoxSection";
import GradientScrollElement from "../components/GradientScrollElement/GradientScrollElement";
import InstrGif from "../images/instructionGif";
import DotsLong from "../svgs/Background/DotsLong.svg";
import "./css/showcase.css";
import "animate.css";

export default function Showcase() {

    return (
        <>
            <div className="showcasePageContainer">   
                <h1 className="showcasePageTitle">How To</h1>
                <div id="showcaseScroll" className="showcasePageContent">

                    <BoxSection title={"1: Log in"}>
                            <h3>Select Guest Account</h3>
                            <img className="desktopGif" src={InstrGif.DesktopGuestSignin} alt="How to sign in gif" />
                            <img className="mobileGif" src={InstrGif.MobileGuestSignin} alt="How to sign in gif" />
                            <h3>OR Select Guest Account</h3>
                    </BoxSection>
                    <br />

                    <BoxSection title={"2: Create Game"}>
                            <h3>Go To Flashcard Page</h3>
                            <img className="desktopGif" src={InstrGif.DesktopFlashcards} alt="Go to flashcard page gif" />
                            <img className="mobileGif" src={InstrGif.MobileFlashcards} alt="Go to flashcard page gif" />

                            <h3>Select Keyset</h3>
                            <img className="desktopGif" src={InstrGif.DesktopKeyset} alt="Select keyset gif" />
                            <img className="mobileGif" src={InstrGif.MobileKeyset} alt="select keyset gif" />

                            <h3>Select Test</h3>
                            <img className="desktopGif" src={InstrGif.DesktopTest} alt="Select test gif" />
                            <img className="mobileGif" src={InstrGif.MobileTest} alt="Select test gif" />
                    </BoxSection>
                    <br />

                    <BoxSection title={"3: Testing"}>
                            <h3>Start Game</h3>
                            <img className="desktopGif" src={InstrGif.DesktopStart} alt="Start game gif" />
                            <img className="mobileGif" src={InstrGif.MobileStart} alt="Start game gif" />

                            <h3>Guess Note</h3>
                            <p>CORRECT answer will light up in GREEN, WRONG answers will light up RED </p>
                            <img className="desktopGif" src={InstrGif.DesktopGuess} alt="Correct is green, wrong is red gif" />
                            <img className="mobileGif" src={InstrGif.MobileGuess} alt="Correct is green, wrong is red gif" />

                            <h3>Review, Replay or Restart</h3>
                            <img className="desktopGif" src={InstrGif.DesktopEndGame} alt="End game gif" />
                            <img className="mobileGif" src={InstrGif.MobileEndGame} alt="End ga,e gif" />
                    </BoxSection>
                    <br />
                    
                </div>
            </div>



            <GradientScrollElement controlId="#showcaseScroll" />
            <img className="dotsReview" src={DotsLong} alt="dots" />
        </>
    );
}