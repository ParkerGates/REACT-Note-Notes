import DotsLong from "../svgs/DotsLong.svg";
import BotHome from "../svgs/BotHome2.svg";
import Logo from "../components/Logo/Logo";
import "./css/home.css";
import '../App.css';


export default function Home() {

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
                            <button className="btnPlain guestBtnHome">Guest</button>
                            <div>
                                <button className="btnPlain loginBtnHome">Login</button>
                                <button className="btnGradiant signupBtnHome">Sign Up</button>
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