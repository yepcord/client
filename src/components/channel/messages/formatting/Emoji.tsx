import {ASTNode, Capture, ComponentContent, Rule} from "./index";
import React from "react";
import {MEDIA_ENDPOINT} from "../../../../constants";

interface EmojiProps {
    emoji_name: string,
    emoji_id: string,
}

export function Emoji({emoji_name, emoji_id}: EmojiProps) {
    return (
        <span className="cursor-pointer" aria-label={`:${emoji_name}:`}>
            <img alt={`:${emoji_name}:`} width={20} height={20}
                 src={`${MEDIA_ENDPOINT}/emojis/${emoji_id}.webp?size=44&quality=lossless`}/>
        </span>
    );
}

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