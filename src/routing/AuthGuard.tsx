import React from "react";
import { Navigate } from "react-router-dom";
import { useFirestoreData } from "../context/context";

export default function AuthGuard({children}) {
    let fsd = useFirestoreData();

    if (fsd.user === null) {
        return <Navigate to="/" />
    }
    return children;
}