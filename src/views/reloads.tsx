import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function Reloads() {
    const navigate = useNavigate();
    const {location} = useParams();

    useEffect(()=>{
        navigate(`/${location}`, {replace: true});
    },[])

    return(<></>);
}