import '../App.css';
import "./css/home.css";
import DotsLong from "../svgs/DotsLong.svg";

export default function Home() {

    return(
        <>
            <img className="dotsHome" src={DotsLong} alt="dots" />
            <div className="displayFlexCenter">
                <h1>Welcome Home</h1>
            </div>
        </>
    );
}