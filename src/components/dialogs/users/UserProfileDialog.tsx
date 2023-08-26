import "../../../styles/profile_dialog.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {setUserProfileDialog} from "../../../states/app";
import {Dialog} from "@mui/material";
import Avatar from "../../user/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {RelationshipType} from "../../../types/user";
import ApiClient from "../../../api/client";
import {dmChannelByUserId} from "../../../utils";
import {useNavigate} from "react-router-dom";

export default function UserProfileDialog() {
    const selectedUserId = useSelector((state: RootState) => state.app.profileDialogUserId)
    const user = useSelector((state: RootState) => selectedUserId ? state.users.users[selectedUserId] : null);
    const relationship = useSelector((state: RootState) => selectedUserId ? state.users.relationships[selectedUserId] : null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const open = user !== null;

    const close = () => {
        dispatch(setUserProfileDialog(null));
    }

    let buttons = <></>;
    if (relationship === null)
        buttons = <button className="btn-success">Send Friend Request</button>;
    else if (relationship.type === RelationshipType.REQUEST_RECEIVED)
        buttons = (<>
            <button className="btn-success">Accept</button>
            <button className="btn-secondary" onClick={() => ApiClient.deleteRelationship(user!.id)}>Ignore</button>
        </>);
    else if (relationship.type === RelationshipType.REQUEST_SENT)
        buttons = <button className="btn-success" disabled>Friend Request Sent</button>;
    else if (relationship.type === RelationshipType.FRIEND)
        buttons = (
            <button className="btn-success" onClick={() => {
                dmChannelByUserId(user!.id).then(channel => {
                    if (channel === null) return;
                    navigate(`/channels/@me/${channel.id}`);
                })
            }}>
                Send Message
            </button>
        );

    return (<>
        <Dialog open={open} onClose={close} sx={{
            "& .MuiPaper-root": {
                backgroundColor: "transparent",
            }
        }}>
            <div className="profile-dialog">
                <div className="profile-dialog-banner">

                </div>
                <div className="profile-dialog-content">
                    <div className="profile-dialog-badges-btns">
                        <div className="profile-dialog-avatar">
                            {open && <Avatar user={user!} size={64}/>}
                        </div>
                        <div className="profile-dialog-btns">
                            {buttons}
                            <MoreVertIcon className="btn-icon"/>
                        </div>
                    </div>
                    <div className="profile-dialog-info-card">
                        <div className="card-profile-fusername">
                            <h3>{user?.username}</h3>
                            <h3 className="card-profile-discriminator">#{user?.discriminator}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    </>);
}