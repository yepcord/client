import {mentionRule} from "./Mention";
import Parser from "./Parser";
import React from "react";
import {mentionEveryoneRule} from "./MentionEveryone";
import {linkRule} from "./Link";
import {italicRule} from "./Italic";
import {boldRule} from "./Bold";
import {underlineRule} from "./Underline";

export interface ASTNode {
    content: string,
    consume: string,
    parseContent?: boolean,
}

export type ComponentContent = string | React.ReactNode;

export interface Capture extends Array<string> {
    index?: number,
    input?: string,
}

export interface Rule {
    match: (arg0: string) => Capture | null,
    parse: (arg0: Capture) => ASTNode,
    react: (arg0: ComponentContent) => React.JSX.Element,
}

export const rules = [mentionRule, mentionEveryoneRule, linkRule, boldRule, underlineRule, italicRule];

export const parse = (source: string) => {
    return new Parser(source).parse();
}