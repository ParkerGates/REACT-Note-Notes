import React from 'react';
import "./BoxSection.css";

interface Props {
    title: string;
    children: any;
}

function BoxSection({title, children}: Props) {

    return(
        <>
            <div className="titleBS"
            >{title}</div>
            <div className="containerBS">
                <div className="contentBS">
                    {children}
                </div>
            </div>
        </>
    );
}

export default BoxSection;