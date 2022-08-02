import DotsLong from "../svgs/DotsLong.svg";
import "./css/showcase.css";

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