import { useState } from "react";
import "./Lock.css";

interface Props {
    lockState: boolean;
    setLockState: Function;
}

export default function Lock({lockState, setLockState}: Props) {
    const toggleLock = () => {
        setLockState(prevState => !prevState);
    }

    return(
        <button
            onClick={toggleLock}
            className={`lock ${lockState ? "" : "locked"}`}
            >&nbsp;
        </button>
    );
}