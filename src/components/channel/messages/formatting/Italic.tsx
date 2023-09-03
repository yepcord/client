import {ASTNode, Capture, ComponentContent, Rule} from "./index";
import React, {ReactNode} from "react";

interface ItalicProps {
    content: string | ReactNode,
}

export function Italic({content}: ItalicProps) {
    return <span style={{fontStyle: "italic"}}>{content}</span>;
}

export const italicRule: Rule = {
    match: function (source: string) {
        return /\*(.+)\*|_(.+)_/.exec(source);
    },

    parse: function (capture: Capture): ASTNode {
        return {
            content: capture[1] ? capture[1] : capture[2],
            consume: capture[0],
            parseContent: true,
        };
    },

    react: function (node: ComponentContent) {
        return <Italic content={node}/>;
    },
};