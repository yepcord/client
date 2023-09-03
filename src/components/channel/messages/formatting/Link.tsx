import {ASTNode, Capture, ComponentContent, Rule} from "./index";
import React from "react";

interface LinkProps {
    url: string,
}

export function Link({url}: LinkProps) {
    return <a href={url} target="_blank" className="message-component-link" rel="noreferrer">{url}</a>;
}

export const linkRule: Rule = {
    match: function (source: string) {
        return /(https?:\/\/[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9]+\.[^\s]{2,})/.exec(source);
    },

    parse: function (capture: Capture): ASTNode {
        return {
            content: capture[1],
            consume: capture[0],
        };
    },

    react: function (node: ComponentContent) {
        return <Link url={node as string}/>;
    },
};