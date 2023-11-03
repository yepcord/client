import Avatar from "../../../user/Avatar";
import Tooltip from "@mui/material/Tooltip";
import User from "../../../../types/user";
import CloseIcon from '@mui/icons-material/Close';
import ApiClient from "../../../../api/client";
import {userProfileDialogUserId} from "../../../dialogs/users/UserProfileDialog";

interface BlockedItemProps {
    user: User,
}

export default function BlockedItem({user}: BlockedItemProps) {
    return (
        <div className="profile-panel bg-transparent" onClick={() => userProfileDialogUserId.value = user.id}>
            <div className="profile-panel-user">
                <Avatar user={user} withBadge={false}/>

                <div className="profile-panel-username">
                        <span className="friend-username" style={{color: "#ffffff"}}>
                            <b>{user.username}</b>
                            <span className="friend-discriminator" style={{color: "#a1a1a1"}}>#{user.discriminator}</span>
                        </span>
                    <span style={{color: "#a1a1a1"}}>
                        Blocked
                    </span>
                </div>
            </div>
            <div className="profile-panel-buttons">
                <Tooltip title="Unblock" placement="top" arrow>
                    <CloseIcon onClick={(e) => {
                        e.stopPropagation();
                        ApiClient.deleteRelationship(user.id);
                    }}/>
                </Tooltip>
            </div>
        </div>
    );
}