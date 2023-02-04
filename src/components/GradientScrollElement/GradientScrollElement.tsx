import { useState, useEffect } from 'react';
import "./GradientScroll.css";

interface Props {
    controlId: string;
}

export default function GradientScrollElement({controlId}: Props) {
    const [holdTimer, setHoldTimer] = useState<any>(null);
    const [selected, setSelected] = useState<any>(document.querySelector(controlId));
    const [activeScrollBtn, setActiveScrollBtn] = useState<"up"|""|"down">("");
    

    const btnScrollByHoldDown = (dir: "up" | "down") => {
        const scrollSpeed = dir === "up" ? -6 : 6;
        
        selected.scrollTop += scrollSpeed;
        setHoldTimer(setTimeout(() => {btnScrollByHoldDown(dir)}, 10));
    }
    const btnScrollEndScroll = () => {
        if (activeScrollBtn !== "") setActiveScrollBtn("");
        clearTimeout(holdTimer);
    }

    useEffect(() => {
        setSelected(document.querySelector(controlId));
    }, []);


    if (selected === null) { return <></>}
    return(
        <div className="gradientScroll">
                <button
                    id="gradUpArrow"
                    onMouseDown={() => {btnScrollByHoldDown("up"); setActiveScrollBtn("up")}}
                    onMouseUp={btnScrollEndScroll}
                    onMouseLeave={btnScrollEndScroll}
                    className="gradientScrollBtn"
                ><i className={`fa fa-solid fa-chevron-up gradientScrollIcons ${activeScrollBtn === "up" && "gradIconOpacity"}`}>
                </i></button>

                <button
                    onMouseDown={() => {btnScrollByHoldDown("down"); setActiveScrollBtn("down")}}
                    onMouseUp={btnScrollEndScroll}
                    onMouseLeave={btnScrollEndScroll}
                    className="gradientScrollBtn"
                ><i className={`fa fa-solid fa-chevron-down gradientScrollIcons ${activeScrollBtn === "down" && "gradIconOpacity"}`}>
                </i></button>
        </div>
    );
}
