import {ASTNode, Capture, ComponentContent, Rule} from "./index";
import React, {ReactNode, useState} from "react";

interface SpoilerProps {
    content: string | ReactNode,
}

export function Spoiler({content}: SpoilerProps) {
    const [show, setShow] = useState(false);

    return (
        <span className={`message-spoiler${show ? "-show" : ""}`} onClick={() => setShow(true)}>
            <span className="spoiler-content">{content}</span>
        </span>
    );
}

export const spoilerRule: Rule = {
    match: function (source: string) {
        return /\|\|(.+)\|\|/.exec(source);
    },

    parse: function (capture: Capture): ASTNode {
        return {
            content: capture[1],
            consume: capture[0],
            parseContent: true,
        };
    },

    react: function (node: ComponentContent) {
        return <Spoiler content={node}/>;
    },
};