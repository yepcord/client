import {ASTNode, Capture, ComponentContent, Rule} from "./index";
import React, {ReactNode} from "react";

interface UnderlineProps {
    content: string | ReactNode,
}

export function Underline({content}: UnderlineProps) {
    return <span style={{textDecoration: "underline"}}>{content}</span>;
}

export const underlineRule: Rule = {
    match: function (source: string) {
        return /__(.+)__/.exec(source);
    },

    parse: function (capture: Capture): ASTNode {
        return {
            content: capture[1],
            consume: capture[0],
            parseContent: true,
        };
    },

    react: function (node: ComponentContent) {
        return <Underline content={node}/>;
    },
};