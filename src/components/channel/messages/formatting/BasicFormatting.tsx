import React from "react";
import {Bold, Underline, Italic, Spoiler, Crossed} from "./BasicTypes";
import ComponentParser, {ComponentContent} from "./ComponentFormatting";

enum TokenType {
    STRING,
    UNDERSCORE,
    DOUBLE_UNDERSCORE,
    ASTERISK,
    DOUBLE_ASTERISK,
    TILDE,
    DOUBLE_TILDE,
    GREATER_THAN,
    LESS_THAN,
    VERTICAL_BAR,
    DOUBLE_VERTICAL_BAR,
}

enum NodeType {
    ROOT,
    STRING,
    BOLD,
    UNDERLINE,
    ITALIC,
    CROSSED,
    SPOILER,
}

const NodeTypes = {
        "__": NodeType.UNDERLINE,
        "*": NodeType.ITALIC,
        "**": NodeType.BOLD,
        "~~": NodeType.CROSSED,
        "||": NodeType.SPOILER,
};

const Converters = {
    [NodeType.UNDERLINE]: (content: ComponentContent) => {
        return <Underline content={content}/>;
    },
    [NodeType.ITALIC]: (content: ComponentContent) => {
        return <Italic content={content}/>;
    },
    [NodeType.BOLD]: (content: ComponentContent) => {
        return <Bold content={content}/>;
    },
    [NodeType.SPOILER]: (content: ComponentContent) => {
        return <Spoiler content={content}/>;
    },
    [NodeType.CROSSED]: (content: ComponentContent) => {
        return <Crossed content={content}/>;
    },
    [NodeType.STRING]: (content: ComponentContent) => {
        return new ComponentParser(content as string).parse();
    },
    [NodeType.ROOT]: (content: ComponentContent) => {
        return <>{content}</>;
    },
}

class Token {
    public readonly type: TokenType;
    public readonly value: string;

    constructor(type: TokenType, value: string) {
        this.type = type;
        this.value = value;
    }
}

class TokenParser {
    private readonly text: string;
    private pos: number;

    private readonly TYPES = {
        "_": TokenType.UNDERSCORE,
        "__": TokenType.DOUBLE_UNDERSCORE,
        "*": TokenType.ASTERISK,
        "**": TokenType.DOUBLE_ASTERISK,
        "~": TokenType.TILDE,
        "~~": TokenType.DOUBLE_TILDE,
        "|": TokenType.VERTICAL_BAR,
        "||": TokenType.DOUBLE_VERTICAL_BAR,
    }

    constructor(text: string) {
        this.text = text;
        this.pos = 0;
    }

    private getChar(move=true) {
        if(this.pos >= this.text.length) return "";
        const ret = this.text[this.pos];
        if(move) this.pos++;

        return ret;
    }

    parse() {
        const tokens: Token[] = [];
        let current_string = "";
        while(true) {
            const char = this.getChar();
            if(char === "") break;

            if(!(char in this.TYPES)) {
                current_string += char;
                continue;
            }

            if(current_string) {
                tokens.push(new Token(TokenType.STRING, current_string));
                current_string = "";
            }

            if(this.getChar(false) === char) {
                tokens.push(new Token(this.TYPES[(char+char) as keyof typeof this.TYPES], char+char));
                this.getChar();
            } else {
                tokens.push(new Token(this.TYPES[char as keyof typeof this.TYPES], char));
            }
        }

        if(current_string)
            tokens.push(new Token(TokenType.STRING, current_string));
        return tokens;
    }
}

class Node {
    public readonly type: NodeType;
    public tree: Node[];
    public value: string | undefined;

    constructor(type: NodeType, value: (string | undefined) = undefined) {
        this.type = type;
        this.tree = [];
        this.value = value;
    }

    static string(value: string) {
        return new Node(NodeType.STRING, value);
    }

    react(content: ComponentContent) {
        return Converters[this.type as keyof typeof Converters](content);
    }
}

export class BasicParser {
    public tokens: Token[];
    public node: Node;

    constructor(tokens: Token[], root_node: (Node | undefined) = undefined) {
        this.tokens = tokens;
        this.node = root_node ? root_node : new Node(NodeType.ROOT);
    }

    private find_token(token_type: TokenType) {
        for(let i = 0; i < this.tokens.length; i++) {
            if(this.tokens[i].type === token_type) return i;
        }
    }

    private merge_strings() {
        let current_string: Node | null = null;
        const to_remove: number[] = [];
        let removed = 0;

        for(let i = 0; i < this.node.tree.length; i++) {
            const node = this.node.tree[i];

            if(node.type === NodeType.STRING) {
                if(current_string === null) {
                    current_string = node;
                } else {
                    current_string.value! += node.value;
                    to_remove.push(i);
                }
            } else {
                current_string = null;
            }
        }

        for(let index of to_remove) {
            this.node.tree.splice(index-removed, 1);
            removed++;
        }
    }

    private set_value() {
        if(this.node.tree.length === 1 && this.node.tree[0].type === NodeType.STRING) {
            this.node.value = this.node.tree[0].value;
            this.node.tree = [];
        }
    }

    private fix_all() {
        this.merge_strings();
        //this.set_value(); // causes all elements to render twice like this: <Spoiler><Spoiler>content</Spoiler></Spoiler>
    }

    build_tree() {
        while(this.tokens.length > 0) {
            const token = this.tokens.shift()!;
            if(!(token.value in NodeTypes)) {
                this.node.tree.push(Node.string(token.value));
                continue;
            }

            const found_idx = this.find_token(token.type);
            if(found_idx === undefined) {
                this.node.tree.push(Node.string(token.value));
                continue;
            }

            const tokens = this.tokens.splice(0, found_idx);
            const new_node = new Node(NodeTypes[token.value as keyof typeof NodeTypes]);
            this.node.tree.push(new BasicParser(tokens, new_node).build_tree());

            this.tokens.shift();
        }

        this.fix_all()

        return this.node;
    }
}

function convertToReact(node: Node): React.JSX.Element {
    if(node.type === NodeType.STRING || node.value)
        return node.react(Converters[NodeType.STRING](node.value));
    const elements = [];
    for(let ch of node.tree) {
        elements.push(ch.react(convertToReact(ch)));
    }

    return <>{elements}</>;
}

export default function parse(content: string) {
    const tokens = new TokenParser(content).parse();
    const parser = new BasicParser(tokens);
    const node = parser.build_tree();

    return convertToReact(node);
}
