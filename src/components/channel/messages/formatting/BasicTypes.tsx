import React, {ReactNode, useState} from "react";

interface Props {
    content: string | ReactNode,
}

export function Bold({content}: Props) {
    return <span style={{fontWeight: "bold"}}>{content}</span>;
}

export function Italic({content}: Props) {
    return <span style={{fontStyle: "italic"}}>{content}</span>;
}

export function Spoiler({content}: Props) {
    const [show, setShow] = useState(false);

    return (
        <span className={`message-spoiler${show ? "-show" : ""}`} onClick={() => setShow(true)}>
            <span className="spoiler-content">{content}</span>
        </span>
    );
}

export function Underline({content}: Props) {
    return <span style={{textDecoration: "underline"}}>{content}</span>;
}

export function Crossed({content}: Props) {
    return <span style={{textDecoration: "line-through"}}>{content}</span>;
}