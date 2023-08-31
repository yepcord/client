import {ASTNode, Capture, Rule} from "./index";
import React from "react";

interface MentionEveryoneProps {
    mention: "everyone" | "here",
}

export function MentionEveryone({mention}: MentionEveryoneProps) {
    return <span className="btn-primary btn-ping">@{mention}</span>;
}

export const mentionEveryoneRule: Rule = {
    match: function(source: string) {
        return /@(everyone|here)/.exec(source);
    },

    parse: function(capture: Capture): ASTNode {
        return {
            content: capture[1],
            consume: capture[0],
        };
    },

    react: function(node: ASTNode) {
        return <MentionEveryone mention={node.content as ("everyone" | "here")}/>;
    },
};