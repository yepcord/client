import {ASTNode, Capture, ComponentContent, Rule} from "./index";
import React, {ReactNode} from "react";

interface BoldProps {
    content: string | ReactNode,
}

export function Bold({content}: BoldProps) {
    return <span style={{fontWeight: "bold"}}>{content}</span>;
}

export const boldRule: Rule = {
    match: function (source: string) {
        return /\*\*(.+)\*\*/.exec(source);
    },

    parse: function (capture: Capture): ASTNode {
        return {
            content: capture[1],
            consume: capture[0],
            parseContent: true,
        };
    },

    react: function (node: ComponentContent) {
        return <Bold content={node}/>;
    },
};