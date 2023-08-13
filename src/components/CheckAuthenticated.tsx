import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {Navigate} from "react-router-dom";

interface Props {
    component: React.FC,
}

export default function CheckAuthenticated({component}: Props) {
    const token = useSelector((state: RootState) => state.app.token);

    if(!token)
        return <Navigate to="/login" replace />

    const Component = component;
    return <Component/>
}