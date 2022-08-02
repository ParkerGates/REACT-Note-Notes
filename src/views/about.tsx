import Logo from '../components/Logo/Logo';
import DotsLong from "../svgs/DotsLong.svg";
import "./css/about.css";

export default function About() {

    return (
        <div>
            <h1>About</h1>
            
            <div className="aboutBg">
                <img className="dotsAbout" src={DotsLong} alt="dots" />
            </div>
        </div>
    );
}