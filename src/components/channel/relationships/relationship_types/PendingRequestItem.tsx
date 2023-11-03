import Avatar from "../../../user/Avatar";
import Tooltip from "@mui/material/Tooltip";
import User, {RelationshipType} from "../../../../types/user";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import ApiClient from "../../../../api/client";
import {userProfileDialogUserId} from "../../../dialogs/users/UserProfileDialog";

interface PendingRequestItemProps {
    user: User,
    type: RelationshipType
}

export default function PendingRequestItem({user, type}: PendingRequestItemProps) {
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
                        {type === RelationshipType.REQUEST_SENT ? "Outgoing Friend Request" : "Incoming Friend Request"}
                    </span>
                </div>
            </div>
            <div className="profile-panel-buttons">
                {type === RelationshipType.REQUEST_RECEIVED && (
                    <Tooltip title="Accept" placement="top" arrow>
                        <DoneIcon onClick={(e) => {
                            e.stopPropagation();
                            ApiClient.acceptRelationship(user.id);
                        }}/>
                    </Tooltip>
                )}
                <Tooltip title={type === RelationshipType.REQUEST_SENT ? "Cancel" : "Ignore"} placement="top" arrow>
                    <CloseIcon onClick={(e) => {
                        e.stopPropagation();
                        ApiClient.deleteRelationship(user.id);
                    }}/>
                </Tooltip>
            </div>
        </div>
    );
}