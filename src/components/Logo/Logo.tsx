import LogoBig from "../../svgs/Logos/LogoBig.png";
import LogoSmall from "../../svgs/Logos/LogoSmall.svg";
import './logo.css';

interface Props {
    size: "Large" | "Small";
    width?: string;
}

export default function Logo({size, width}: Props) {
    const logo = size === "Small" ?
        <img src={LogoSmall} alt="Logo" width={width} /> :
        <img src={LogoBig} alt="Logo" width={width} style={{width:width, position:"absolute"}} />;

    return (<>{logo}</>);
}