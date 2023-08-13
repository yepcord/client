import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {Navigate} from "react-router-dom";

interface Props {
    component: React.FC,
}

export default function CheckUnathenticated({component}: Props) {
    const token = useSelector((state: RootState) => state.app.token);

    if(token)
        return <Navigate to="/app" replace />

    const Component = component;
    return <Component/>
}