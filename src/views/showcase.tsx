import DotsLong from "../svgs/Background/DotsLong.svg";
import "./css/showcase.css";
import 'animate.css';

export default function Showcase() {

    return (
        <div>
            <h1>Showcase</h1>
            <div className="showcaseBg">
                <img className="dotsShowcase" src={DotsLong} alt="dots" />
            </div>
        </div>
    );
}