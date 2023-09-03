import {ASTNode, Capture, ComponentContent, Rule} from "./index";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import React from "react";
import {createSnowflake} from "../../../../utils";
import {setProfileMenuElement} from "../../../../states/messages";

interface MentionProps {
    user_id: string,
}

export function Mention({user_id}: MentionProps) {
    const user = useSelector((state: RootState) => state.users.users[user_id]);
    const dispatch = useDispatch();

    return (
        <span data-profile-menu={createSnowflake()} data-profile-user={user.id} data-profile-mention="true"
              className="btn-primary btn-ping cursor-pointer"
              onClick={e => dispatch(setProfileMenuElement(e.currentTarget.getAttribute("data-profile-menu")))}>
            @{user ? user.username : "Unknown User"}
        </span>
    );
}

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