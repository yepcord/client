import {Divider, Menu, PopoverOrigin} from "@mui/material";
import React from "react";
import Banner from "../../user/Banner";
import Avatar from "../../user/Avatar";
import {useDispatch, useSelector} from "react-redux";
import store, {RootState} from "../../../store";
import {snowflakeToDate, getMessage} from "../../../utils";
import {format} from "date-fns";
import {setProfileMenuElement} from "../../../states/messages";
import ApiClient from "../../../api/client";
import User from "../../../types/user";
import {addUser} from "../../../states/users";
import {userProfileDialogUserId} from "../../dialogs/users/UserProfileDialog";

// Maybe rewrite so ot will be used in all messages and mentions elements as <UserProfileMenu user={user} ...>??
export default function UserProfileMenu() {
    const messageId = useSelector((state: RootState) => state.messages.profileMenuElementId);
    const element = document.querySelector(`[data-profile-menu="${messageId}"]`);
    const dispatch = useDispatch();
    const open = Boolean(element);

    const isMention = element?.getAttribute("data-profile-mention") === "true";
    const dpu = element?.getAttribute("data-profile-user");
    const dpm = element?.getAttribute("data-profile-message");
    let user: User | null = dpu ? store.getState().users.users[dpu] : null;
    if (dpm) {
        const [channel_id, message_id] = dpm.split("-");
        const message = getMessage(store.getState().messages.messages[channel_id], message_id);
        user = message!.author;
    }

    if(user === null) return <></>;

    const storedUser = store.getState().users.users[user.id];
    user = storedUser ? {...user, ...storedUser} : user;

    (storedUser === null || !("all_loaded" in storedUser) || !storedUser.all_loaded) &&
    ApiClient.getUserProfile(user.id).then(resp => {
        if(resp.status !== 200) return;

        const usr: User = {...((resp.body! as {user: User}).user as User), all_loaded: true};
        dispatch(addUser(usr));
    });

    const anchorOrigin: PopoverOrigin = isMention
        ? {vertical: "center", horizontal: "right"}
        : {vertical: "bottom", horizontal: "left"};
    const transformOrigin: PopoverOrigin = isMention
        ? {vertical: "center", horizontal: "left"}
        : {vertical: "top", horizontal: "left"};

    const close = () => dispatch(setProfileMenuElement(null));

    return (
        <Menu open={open} onClose={close} anchorEl={element}
              anchorOrigin={anchorOrigin}
              transformOrigin={transformOrigin}
              slotProps={{paper: {sx: {width: "350px", backgroundColor: "transparent", boxShadow: "none"}}}}>
            <Banner user={user} height={50}/>
            <div className="profile-dialog-content">
                <div className="profile-dialog-badges-btns">
                    <Avatar user={user} size={64} onClick={() => {
                        userProfileDialogUserId.value = user!.id;
                        close();
                    }}/>
                </div>
                <div className="profile-dialog-info-card">
                    <div className="card-profile-fusername">
                        <h3>{user?.username}</h3>
                        <h3 className="card-profile-discriminator">#{user?.discriminator}</h3>
                    </div>

                    <Divider flexItem sx={{backgroundColor: "var(--theme-3)", margin: "10px 0"}}/>

                    {user.bio &&
                        <div className="card-info-row" style={{margin: "7px 0"}}>
                            <div className="card-info-text text-14">
                                <span className="text-main text-bold">ABOUT ME</span>
                                <span className="text-secondary">{user.bio}</span>
                            </div>
                        </div>
                    }

                    <div className="card-info-row" style={{margin: "7px 0"}}>
                        <div className="card-info-text text-14">
                            <span className="text-main text-bold">MEMBER SINCE</span>
                            <span className="text-secondary">{format(snowflakeToDate(user.id), "MMM dd, yyyy")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Menu>
    );
}
