import React from 'react';
import './TitleHR.css';

interface Props {
    title: string;
    fontSize: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" 
}

function TitleHR({title, fontSize}: Props) {
    let size: string = "";
    switch (fontSize) {
        case "h1":  size = "2.125";  break;
        case "h2":  size = "1.875";  break;
        case "h3":  size = "1.5";    break;
        case "h4":  size = "1.25";   break;
        case "h5":  size = "1.125";  break;
        case "h6":  size = "1";      break;
        default:    size = "1";
    }

    return(
        <div className="boxTH">
            <h1 className="titleTH" style={{fontSize: `${size}rem`}}>{title}</h1>
            <hr className="hrTH" style={{marginTop: `${String(Number(size) / 1.8)}rem` }} />
        </div>
    );
}

export default TitleHR;