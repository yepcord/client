import "../../../styles/settings.css";
import "../../../styles/main.css";
import {Dialog, Divider} from "@mui/material";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {closeSettings} from "../../../states/app";
import CloseIcon from '@mui/icons-material/Close';
import {logOut} from "../../../utils";
import {useNavigate} from "react-router-dom";
import {SettingsTab} from "./tabs/SettingsTab";
import TransparentSecondaryButton from "../../ui/TransparentSecondaryButton";

export type SettingsCategories = "account" | "profiles" | "privacy" | "apps" | "connections" | "friends" | "appearance" |
    "accessibility" | "voice_and_video" | "text_and_images" | "notifications" | "keybinds" | "language" |
    "streamer_mode" | "advanced" | "activity_privacy" | "games" | "hypesquad";

export default function SettingsDialog() {
    const open = useSelector((state: RootState) => state.app.settingsDialogOpen);
    const dispatch = useDispatch();
    const [selectedCategory, setSelected] = useState("account" as SettingsCategories);
    const navigate = useNavigate();

    const isSelected = (name: SettingsCategories) => {
        return name === selectedCategory;
    }

    return (
        <Dialog fullScreen open={open} onClose={() => dispatch(closeSettings())}>
            <div className="settings-dialog">
                <div className="settings-categories-container">
                    <div className="settings-categories-list">
                        <TransparentSecondaryButton onClick={() => setSelected("account")}
                                selected={isSelected("account")}>My Account
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("profiles")}
                                selected={isSelected("profiles")}>Profiles
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("privacy")}
                                selected={isSelected("privacy")}>Privacy & Safety
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("apps")}
                                selected={isSelected("apps")}>Authorized Apps
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("connections")}
                                selected={isSelected("connections")}>Connections
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("friends")}
                                selected={isSelected("friends")}>Friend Requests
                        </TransparentSecondaryButton>

                        <Divider flexItem sx={{backgroundColor: "#757575"}}/>

                        <TransparentSecondaryButton onClick={() => setSelected("appearance")}
                                selected={isSelected("appearance")}>Appearance
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("accessibility")}
                                selected={isSelected("accessibility")}>Accessibility
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("voice_and_video")}
                                selected={isSelected("voice_and_video")}>Voice & Video
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("text_and_images")}
                                selected={isSelected("text_and_images")}>Text & Images
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("notifications")}
                                selected={isSelected("notifications")}>Notifications
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("keybinds")}
                                selected={isSelected("keybinds")}>Keybinds
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("language")}
                                selected={isSelected("language")}>Language
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("streamer_mode")}
                                selected={isSelected("streamer_mode")}>Streamer Mode
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("advanced")}
                                selected={isSelected("advanced")}>Advanced
                        </TransparentSecondaryButton>

                        <Divider flexItem sx={{backgroundColor: "#757575"}}/>

                        <TransparentSecondaryButton onClick={() => setSelected("activity_privacy")}
                                selected={isSelected("activity_privacy")}>Activity
                            Privacy
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("games")}
                                selected={isSelected("games")}>Registered Games
                        </TransparentSecondaryButton>

                        <Divider flexItem sx={{backgroundColor: "#757575"}}/>

                        <TransparentSecondaryButton onClick={() => setSelected("hypesquad")}
                                selected={isSelected("hypesquad")}>HypeSquad
                        </TransparentSecondaryButton>

                        <Divider flexItem sx={{backgroundColor: "#757575"}}/>

                        <TransparentSecondaryButton onClick={() => {logOut(); navigate("/login")}}>
                            Log Out
                        </TransparentSecondaryButton>
                    </div>
                </div>
                <div className="settings-content-container">
                    <div className="settings-content">
                        <SettingsTab name={selectedCategory}/>
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