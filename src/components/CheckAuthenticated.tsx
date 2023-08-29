import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {Navigate} from "react-router-dom";

interface Props {
    component?: React.FC,
    element?: React.JSX.Element,
}

export default function CheckAuthenticated({component, element}: Props) {
    const token = useSelector((state: RootState) => state.app.token);

    if(!token)
        return <Navigate to="/login" replace />

    if(component) {
        const Component = component;
        return <Component/>
    }
    if(element)
        return element;

    return <></>;
}