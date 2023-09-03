import {rules} from "./index";
import React from "react";

function split2s(string: string, d: string) {
    let i = string.indexOf(d);
    return [string.substring(0, i), string.substring(i + d.length)];
}

export default class Parser {
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
                    let content = parsed?.parseContent ? new Parser(parsed.content).parse() : parsed.content;

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