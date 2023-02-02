import { useState, useEffect } from 'react';
import "./GradientScroll.css";

interface Props {
    controlId: string;
}

export default function GradientScrollElement({controlId}: Props) {
    const [holdTimer, setHoldTimer] = useState<any>(null);
    const [selected, setSelected] = useState<any>(document.querySelector(controlId));
    const [scrollBarActive, setScrollBarActive] = useState<boolean>(true);
    

    const btnScrollByHoldDown = (dir: "up" | "down") => {
        const scrollSpeed = dir === "up" ? 6 : -6;
    
        selected.scrollTop += scrollSpeed;
        setHoldTimer(setTimeout(() => {btnScrollByHoldDown(dir)}, 10));
    }
    const btnScrollEndScroll = () => {
        clearTimeout(holdTimer);
    }


    const disableArrowScroll = () => {
        if (scrollBarActive === true) setScrollBarActive(false);
    }
    const enableArrowScroll = () => {
        if (scrollBarActive === false) setScrollBarActive(true);
    }


    useEffect(() => {
        document.addEventListener('wheel', disableArrowScroll);
        window.addEventListener("resize", disableArrowScroll);

        setSelected(document.querySelector(controlId));
        return () => {
            document.removeEventListener('wheel', disableArrowScroll);
            window.addEventListener("resize", disableArrowScroll);
        }
    }, []);


    if (selected === null) { return <></>}
    return(
        <div className="gradientScroll" onMouseEnter={enableArrowScroll}>

                <button
                    onMouseDown={() => {btnScrollByHoldDown("down")}}
                    onMouseUp={btnScrollEndScroll}
                    onMouseLeave={btnScrollEndScroll}
                    className="gradientScrollBtn"
                ><i className={`fa fa-solid fa-chevron-up gradientScrollIcons 
                                ${selected.scrollTop === 0 && "gradIconOpacity"}
                                ${!scrollBarActive && "gradIconOpacity"}`}>
                </i></button>

                <button
                    onMouseDown={() => {btnScrollByHoldDown("up")}}
                    onMouseUp={btnScrollEndScroll}
                    onMouseLeave={btnScrollEndScroll}
                    className="gradientScrollBtn"
                ><i className={`fa fa-solid fa-chevron-down gradientScrollIcons 
                                ${selected.scrollTop === (selected.scrollHeight - selected.clientHeight) && "gradIconOpacity"} 
                                ${!scrollBarActive && "gradIconOpacity"}`}>
                </i></button>
        </div>
    );
}