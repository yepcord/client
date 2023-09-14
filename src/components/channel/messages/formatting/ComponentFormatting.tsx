import React from "react";
import rules from "./ComponentRules";

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

export const parse = (source: string) => {
    return new ComponentParser(source).parse();
}

function split2s(string: string, d: string) {
    let i = string.indexOf(d);
    return [string.substring(0, i), string.substring(i + d.length)];
}

export default class ComponentParser {
    private readonly source: string;

    constructor(source: string) {
        this.source = source;
    }

    parse(): React.JSX.Element {
        const elements: (string | React.JSX.Element)[] = [this.source];
        for(let rule of rules) {
            for(let idx in elements) {
                let element = elements[idx];
                if(typeof element !== "string") continue;
                let str = element as unknown as string;

                const res = [];
                let cap = rule.match(str);
                while(cap) {
                    let parsed = rule.parse(cap);
                    let sp = split2s(str, parsed.consume);
                    let content = parsed?.parseContent ? new ComponentParser(parsed.content).parse() : parsed.content;

                    res.push(sp[0]);
                    res.push(rule.react(content));
                    str = sp[1];

                    cap = rule.match(str);
                }
                res.push(str);

                elements.splice(Number(idx), 1, ...res);
            }
        }

        return <>{elements}</>;
    }
}