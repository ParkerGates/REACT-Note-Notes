import DotsLong from "../svgs/Background/DotsLong.svg";
import BotHome from "../svgs/Background/BotHome2.svg";
import Logo from "../components/Logo/Logo";
import "./css/home.css";
import '../App.css';
import withFirebase from "../hoc/firebaseHOC";
import { useFirestoreData } from "../context/context";
import { Link } from "react-router-dom";

function Home(props) {
    let fbd = useFirestoreData();

    return(
        <div className="HomeContainer">  
            <div className="ResponsiveFlexTest">
                <div className="LogoHome">
                    <Logo size="Large" width="100%"/>
                </div>

                <div className="section1Home">
                    <h1 className="s1TitleHome">Learn Music<br />Notes The Fast Way</h1>

                    <div className="s1ContentHome">
                        Our guided learning flashcard system simplifies smooths out the learning the curve making learn sheet
                        music as easy as 1 2 3
                    </div>

                    <div className="s1CallAndBtn">
                        <div className="s1CallToActionHome">Lets Hop To It!</div>

                        <div className="s1BtnContainerHome">
                            { fbd.user === null ?
                                <button className="btnPlain guestBtnHome">Guest</button>
                                :
                                <button onClick={props.signOut} className="btnPlain guestBtnHome">Sign Out</button>
                            }
                            <div>
                                { fbd.user === null ?
                                    <>
                                        <button onClick={props.signIn} className="btnPlain loginBtnHome">Login</button>
                                        <button onClick={props.signIn} className="btnGradiant signupBtnHome">Sign Up</button>
                                    </>
                                    :
                                    <Link to="/setup"><button className="btnGradiant signupBtnHome">Flashcards</button></Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <img className="dotsHome" src={DotsLong} alt="dots" />
            <img className="botHome" src={BotHome} alt="gradiant slope" />
            
        </div>
    );
}

export default withFirebase(Home);