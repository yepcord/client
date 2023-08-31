import {mentionRule} from "./Mention";
import Parser from "./Parser";
import React from "react";
import {mentionEveryoneRule} from "./MentionEveryone";

export interface ASTNode {
    content: string,
    consume: string,
}

export interface Capture extends Array<string> {
    index?: number,
    input?: string,
}

export interface Rule {
    match: (arg0: string) => Capture | null,
    parse: (arg0: Capture) => ASTNode,
    react: (arg0: ASTNode) => React.JSX.Element,
}

export const rules = [mentionRule, mentionEveryoneRule];

export const parse = (source: string) => {
    return new Parser(source).parse();
}