import DotsLong from "../svgs/DotsLong.svg";
import '../App.css';
import "./css/home.css";

export default function Home() {

    return(
        <>
            <div className="displayFlexCenter">
                <h1>Welcome Home</h1>
            </div>
            {/* <div><i className="fa fa-home" aria-hidden="true"> Home</i></div>
            <div><i className="fa fa-question-circle-o" aria-hidden="true"></i> About</div>
            <div><i className="fa fa-th-large" aria-hidden="true"></i> Flashcards</div>
            <div><i className="fa fa-graduation-cap" aria-hidden="true"></i> Review</div>
            <div><i className="fa fa-eye" aria-hidden="true"></i> Show Case</div>
            <div><i className="fa fa-user-circle" aria-hidden="true"></i> Profile</div> */}

            <div className="homeBg">
                <img className="dotsHome" src={DotsLong} alt="dots" />
            </div>
        </>
    );
}