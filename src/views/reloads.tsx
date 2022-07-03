import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";


export default function Reloads() {
    const navigate = useNavigate();
    const {location} = useParams();

    useEffect(()=>{
        navigate(`/${location}`, {replace: true});
        console.log("please", location);
    },[])

    return(<></>);
}