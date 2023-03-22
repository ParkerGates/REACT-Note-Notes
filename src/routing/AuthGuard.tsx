import React from "react";
import { Navigate } from "react-router-dom";
import { useContextData, useFirestoreData } from "../context/context";

export default function AuthGuard({children}) {
    let fsd = useFirestoreData();
    let context = useContextData();

    if (fsd.user === null && context.contextState.guest === false) {
        return <Navigate to="/" />
    }
    return children;
}