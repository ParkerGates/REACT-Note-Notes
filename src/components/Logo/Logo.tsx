import LogoBig from "../../svgs/LogoBig.png";
import LogoSmall from "../../svgs/LogoSmall.svg";
import './logo.css';

interface Props {
    size: "Large" | "Small";
    width?: string;
}

export default function Logo({size, width}: Props) {
    const logo = size === "Small" ?
        <img src={LogoSmall} alt="Logo" width={width} /> :
        <img src={LogoBig} alt="Logo" width={width}/>;

    return (<>{logo}</>);
}