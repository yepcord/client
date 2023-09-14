import React from "react";
import {ASTNode, Capture, ComponentContent, Rule} from "./ComponentFormatting";
import {Mention, MentionEveryone, Emoji, Link} from "./ComponentTypes";

export const mentionRule: Rule = {
    match: function (source: string) {
        return /<@((?:!&)?\d{17,32})>/.exec(source);
    },

    parse: function (capture: Capture): ASTNode {
        return {
            content: capture[1],
            consume: capture[0],
        };
    },

    react: function (node: ComponentContent) {
        return <Mention user_id={node as string}/>;
    },
};

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

    react: function(node: ComponentContent) {
        return <MentionEveryone mention={node as ("everyone" | "here")}/>;
    },
};

export const emojiRule: Rule = {
    match: function (source: string) {
        return /<:([a-zA-Z]{1,32}):(\d{17,32})>/.exec(source);
    },

    parse: function (capture: Capture): ASTNode {
        return {
            content: `${capture[1]}:${capture[2]}`,
            consume: capture[0],
        };
    },

    react: function (node: ComponentContent) {
        const [emoji_name, emoji_id] = (node as string).split(":");
        return <Emoji emoji_name={emoji_name} emoji_id={emoji_id}/>;
    },
};

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

const rules = [mentionRule, mentionEveryoneRule, emojiRule, linkRule];
export default rules;