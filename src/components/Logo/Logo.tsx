import LogoBig from "../../svgs/LogoBig.png";
import LogoSmall from "../../svgs/LogoSmall.svg";
import './logo.css';

interface Props {
    size: "Large" | "Small";
}

export default function Logo({size}: Props) {
    const logo = size === "Small" ?
        <img src={LogoSmall} alt="Logo" /> :
        <img src={LogoBig} alt="Logo" />;

    return (<>{logo}</>);
}