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

                        <div className="showcaseGifContainer">
                            <h2 className="showcaseTitle">1: Select Guest Account or SignUp/SignIn</h2>
                            <img className="desktopGif" src={InstrGif.DesktopGuestSignin} alt="How to sign in gif" />
                            <img className="mobileGif" src={InstrGif.MobileGuestSignin} alt="How to sign in gif" />
                        </div>

                        <div className="showcaseGifContainer">
                            <h2 className="showcaseTitle">2: Go To Flashcard Page</h2>
                            <img className="desktopGif" src={InstrGif.DesktopFlashcards} alt="Go to flashcard page gif" />
                            <img className="mobileGif" src={InstrGif.MobileFlashcards} alt="Go to flashcard page gif" />

                            <h2 className="showcaseTitle">3: Select Keyset</h2>
                            <img className="desktopGif" src={InstrGif.DesktopKeyset} alt="Select keyset gif" />
                            <img className="mobileGif" src={InstrGif.MobileKeyset} alt="select keyset gif" />

                            <h2 className="showcaseTitle">4: Select Test</h2>
                            <img className="desktopGif" src={InstrGif.DesktopTest} alt="Select test gif" />
                            <img className="mobileGif" src={InstrGif.MobileTest} alt="Select test gif" />
                        </div>

                        <div className="showcaseGifContainer">
                            <h2 className="showcaseTitle">5: Start Game</h2>
                            <img className="desktopGif" src={InstrGif.DesktopStart} alt="Start game gif" />
                            <img className="mobileGif" src={InstrGif.MobileStart} alt="Start game gif" />

                            <h2 className="showcaseTitle">6: Guess Note</h2>
                            <p className="showcaseParagraph">
                                <span style={{color:"#26de79"}}>correct</span> answer will light up in <span style={{color:"#26de79"}}>green</span>,
                                <span style={{color:"#cc1b4a"}}> wrong</span> answers will light up in <span style={{color:"#cc1b4a"}}>red</span>
                            </p>
                            <img className="desktopGif" src={InstrGif.DesktopGuess} alt="Correct is green, wrong is red gif" />
                            <img className="mobileGif" src={InstrGif.MobileGuess} alt="Correct is green, wrong is red gif" />

                            <h2 className="showcaseTitle">7: Review, Replay or Restart</h2>
                            <img className="desktopGif" src={InstrGif.DesktopEndGame} alt="End game gif" />
                            <img className="mobileGif marginb" src={InstrGif.MobileEndGame} alt="End ga,e gif" />
                        </div>  
                </div>
            </div>



            <GradientScrollElement controlId="#showcaseScroll" />
            <img className="dotsReview" src={DotsLong} alt="dots" />
        </>
    );
}