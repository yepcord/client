import "../../../styles/settings.css";
import "../../../styles/main.css";
import {Dialog, Divider} from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import {logOut} from "../../../utils";
import {useNavigate} from "react-router-dom";
import {SettingsTab} from "./tabs/SettingsTab";
import TransparentSecondaryButton from "../../ui/TransparentSecondaryButton";
import GitInfo from "react-git-info/macro";
import {signal} from "@preact/signals-react";

export type SettingsCategories = "account" | "profiles" | "privacy" | "apps" | "connections" | "friends" | "appearance" |
    "accessibility" | "voice_and_video" | "text_and_images" | "notifications" | "keybinds" | "language" |
    "streamer_mode" | "advanced" | "activity_privacy" | "games" | "hypesquad";

export const dialogSettingsTab = signal<SettingsCategories | null>(null);

export default function SettingsDialog() {
    const navigate = useNavigate();

    const isSelected = (name: SettingsCategories) => name === dialogSettingsTab.value;
    const setSelected = (tab: SettingsCategories) => dialogSettingsTab.value = tab;

    return (
        <Dialog fullScreen open={dialogSettingsTab.value !== null} onClose={() => dialogSettingsTab.value = null}>
            <div className="settings-dialog">
                <div className="settings-categories-container">
                    <div className="settings-categories-list">
                        <TransparentSecondaryButton onClick={() => setSelected("account")} className="w-100"
                                selected={isSelected("account")}>My Account
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("profiles")} className="w-100"
                                selected={isSelected("profiles")}>Profiles
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("privacy")} className="w-100"
                                selected={isSelected("privacy")}>Privacy & Safety
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("apps")} className="w-100"
                                selected={isSelected("apps")}>Authorized Apps
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("connections")} className="w-100"
                                selected={isSelected("connections")}>Connections
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("friends")} className="w-100"
                                selected={isSelected("friends")}>Friend Requests
                        </TransparentSecondaryButton>

                        <Divider flexItem sx={{backgroundColor: "#757575"}}/>

                        <TransparentSecondaryButton onClick={() => setSelected("appearance")} className="w-100"
                                selected={isSelected("appearance")}>Appearance
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("accessibility")} className="w-100"
                                selected={isSelected("accessibility")}>Accessibility
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("voice_and_video")} className="w-100"
                                selected={isSelected("voice_and_video")}>Voice & Video
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("text_and_images")} className="w-100"
                                selected={isSelected("text_and_images")}>Text & Images
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("notifications")} className="w-100"
                                selected={isSelected("notifications")}>Notifications
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("keybinds")} className="w-100"
                                selected={isSelected("keybinds")}>Keybinds
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("language")} className="w-100"
                                selected={isSelected("language")}>Language
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("streamer_mode")} className="w-100"
                                selected={isSelected("streamer_mode")}>Streamer Mode
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("advanced")} className="w-100"
                                selected={isSelected("advanced")}>Advanced
                        </TransparentSecondaryButton>

                        <Divider flexItem sx={{backgroundColor: "#757575"}}/>

                        <TransparentSecondaryButton onClick={() => setSelected("activity_privacy")} className="w-100"
                                selected={isSelected("activity_privacy")}>Activity
                            Privacy
                        </TransparentSecondaryButton>
                        <TransparentSecondaryButton onClick={() => setSelected("games")} className="w-100"
                                selected={isSelected("games")}>Registered Games
                        </TransparentSecondaryButton>

                        <Divider flexItem sx={{backgroundColor: "#757575"}}/>

                        <TransparentSecondaryButton onClick={() => setSelected("hypesquad")} className="w-100"
                                selected={isSelected("hypesquad")}>HypeSquad
                        </TransparentSecondaryButton>

                        <Divider flexItem sx={{backgroundColor: "#757575"}}/>

                        <TransparentSecondaryButton onClick={() => {logOut(); navigate("/login")}} className="w-100">
                            Log Out
                        </TransparentSecondaryButton>

                        <Divider flexItem sx={{backgroundColor: "#757575"}}/>

                        <span className="text-primary text-14" style={{textAlign: "center"}}>
                            YEPCord <a href={`https://github.com/yepcord/client/tree/${GitInfo().commit.hash}`}
                                       style={{color: "var(--text-main)", textDecoration: "none"}}>
                            <span title={`Commit: ${GitInfo().commit.hash} \nMessage: ${GitInfo().commit.message} \nDate: ${GitInfo().commit.date}`}>
                                {GitInfo().commit.shortHash}
                            </span>
                        </a>
                        </span>
                    </div>
                </div>
                <div className="settings-content-container">
                    <div className="settings-content">
                        <SettingsTab name={dialogSettingsTab.value!}/>
                    </div>
                    <div>
                        <div className="settings-close-button-container" onClick={() => dialogSettingsTab.value = null}>
                            <CloseIcon className="settings-close-button"/>
                            <div>ESC</div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}