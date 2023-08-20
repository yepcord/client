import "../../styles/settings.css";
import "../../styles/main.css";
import {Dialog, Divider} from "@mui/material";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {closeSettings} from "../../states/app";
import CloseIcon from '@mui/icons-material/Close';
import {logOut} from "../../utils";
import {useNavigate} from "react-router-dom";

type SettingsCategories = "account" | "profiles" | "privacy" | "apps" | "connections" | "friends" | "appearance" |
    "accessibility" | "voice_and_video" | "text_and_images" | "notifications" | "keybinds" | "language" |
    "streamer_mode" | "advanced" | "activity_privacy" | "games" | "hypesquad";

export default function SettingsDialog() {
    const open = useSelector((state: RootState) => state.app.settingsDialogOpen);
    const dispatch = useDispatch();
    const [selectedCategory, setSelected] = useState("account" as SettingsCategories);
    const navigate = useNavigate();

    const getSelected = (name: SettingsCategories) => {
        return name === selectedCategory ? " btn-secondary-transparent-selected" : "";
    }

    return (
        <Dialog fullScreen open={open} onClose={() => dispatch(closeSettings())}>
            <div className="settings-dialog">
                <div className="settings-categories-container">
                    <div className="settings-categories-list">
                        <button onClick={() => setSelected("account")}
                                className={`btn-secondary-transparent ${getSelected("account")}`}>My Account
                        </button>
                        <button onClick={() => setSelected("profiles")}
                                className={`btn-secondary-transparent ${getSelected("profiles")}`}>Profiles
                        </button>
                        <button onClick={() => setSelected("privacy")}
                                className={`btn-secondary-transparent ${getSelected("privacy")}`}>Privacy & Safety
                        </button>
                        <button onClick={() => setSelected("apps")}
                                className={`btn-secondary-transparent ${getSelected("apps")}`}>Authorized Apps
                        </button>
                        <button onClick={() => setSelected("connections")}
                                className={`btn-secondary-transparent ${getSelected("connections")}`}>Connections
                        </button>
                        <button onClick={() => setSelected("friends")}
                                className={`btn-secondary-transparent ${getSelected("friends")}`}>Friend Requests
                        </button>

                        <Divider flexItem sx={{backgroundColor: "#757575"}}/>

                        <button onClick={() => setSelected("appearance")}
                                className={`btn-secondary-transparent ${getSelected("appearance")}`}>Appearance
                        </button>
                        <button onClick={() => setSelected("accessibility")}
                                className={`btn-secondary-transparent ${getSelected("accessibility")}`}>Accessibility
                        </button>
                        <button onClick={() => setSelected("voice_and_video")}
                                className={`btn-secondary-transparent ${getSelected("voice_and_video")}`}>Voice & Video
                        </button>
                        <button onClick={() => setSelected("text_and_images")}
                                className={`btn-secondary-transparent ${getSelected("text_and_images")}`}>Text & Images
                        </button>
                        <button onClick={() => setSelected("notifications")}
                                className={`btn-secondary-transparent ${getSelected("notifications")}`}>Notifications
                        </button>
                        <button onClick={() => setSelected("keybinds")}
                                className={`btn-secondary-transparent ${getSelected("keybinds")}`}>Keybinds
                        </button>
                        <button onClick={() => setSelected("language")}
                                className={`btn-secondary-transparent ${getSelected("language")}`}>Language
                        </button>
                        <button onClick={() => setSelected("streamer_mode")}
                                className={`btn-secondary-transparent ${getSelected("streamer_mode")}`}>Streamer Mode
                        </button>
                        <button onClick={() => setSelected("advanced")}
                                className={`btn-secondary-transparent ${getSelected("advanced")}`}>Advanced
                        </button>

                        <Divider flexItem sx={{backgroundColor: "#757575"}}/>

                        <button onClick={() => setSelected("activity_privacy")}
                                className={`btn-secondary-transparent ${getSelected("activity_privacy")}`}>Activity
                            Privacy
                        </button>
                        <button onClick={() => setSelected("games")}
                                className={`btn-secondary-transparent ${getSelected("games")}`}>Registered Games
                        </button>

                        <Divider flexItem sx={{backgroundColor: "#757575"}}/>

                        <button onClick={() => setSelected("hypesquad")}
                                className={`btn-secondary-transparent ${getSelected("hypesquad")}`}>HypeSquad
                        </button>

                        <Divider flexItem sx={{backgroundColor: "#757575"}}/>

                        <button onClick={() => {logOut(); navigate("/login")}} className="btn-secondary-transparent">
                            Log Out
                        </button>
                    </div>
                </div>
                <div className="settings-content-container">
                    <div className="settings-content">
                        Content
                    </div>
                    <div>
                        <div className="settings-close-button-container" onClick={() => dispatch(closeSettings())}>
                            <CloseIcon className="settings-close-button"/>
                            <div>ESC</div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}