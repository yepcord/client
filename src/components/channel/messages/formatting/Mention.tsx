import {ASTNode, Capture, Rule} from "./index";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store";

interface MentionProps {
    user_id: string,
}

export function Mention({user_id}: MentionProps) {
    const user = useSelector((state: RootState) => state.users.users[user_id]);

    return (
        <span className="btn-primary btn-ping">@{user ? user.username : "Unknown User"}</span>
    );
}

export const mentionRule: Rule = {
    match: function(source: string) {
        return /<@((?:!|&)?\d{17,32})>/.exec(source);
    },

    parse: function(capture: Capture): ASTNode {
        return {
            content: capture[1],
            consume: capture[0],
        };
    },

    react: function(node: ASTNode) {
        return <Mention user_id={node.content}/>;
    },
};