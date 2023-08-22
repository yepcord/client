import AccountTab from "./AccountTab";
import {SettingsCategories} from "../SettingsDialog";
import ProfilesTab from "./ProfilesTab";
import PrivacyTab from "./PrivacyTab";
import AuthorizedAppsTab from "./AuthorizedAppsTab";
import ConnectionsTab from "./ConnectionsTab";
import FriendRequestsTab from "./FriendRequestsTab";
import AppearanceTab from "./AppearanceTab";
import AccessibilityTab from "./AccessibilityTab";
import VoiceAndVideoTab from "./VoiceAndVideoTab";
import TextAndImagesTab from "./TextAndImagesTab";
import NotificationsTab from "./NotificationsTab";
import KeybindsTab from "./KeybindsTab";
import LanguageTab from "./LanguageTab";
import StreamerModeTab from "./StreamerModeTab";
import AdvancedTab from "./AdvancedTab";
import ActivityPrivacyTab from "./ActivityPrivacyTab";
import RegisteredGamesTab from "./RegisteredGamesTab";
import HypesquadTab from "./HypesquadTab";

interface SettingsTabProps {
    name: SettingsCategories,
}

export function SettingsTab({name}: SettingsTabProps) {
    if(name === "account")
        return <AccountTab/>;
    else if (name === "profiles")
        return <ProfilesTab/>;
    else if (name === "privacy")
        return <PrivacyTab/>;
    else if (name === "apps")
        return <AuthorizedAppsTab/>;
    else if (name === "connections")
        return <ConnectionsTab/>;
    else if (name === "friends")
        return <FriendRequestsTab/>;
    else if (name === "appearance")
        return <AppearanceTab/>;
    else if (name === "accessibility")
        return <AccessibilityTab/>;
    else if (name === "voice_and_video")
        return <VoiceAndVideoTab/>;
    else if (name === "text_and_images")
        return <TextAndImagesTab/>;
    else if (name === "notifications")
        return <NotificationsTab/>;
    else if (name === "keybinds")
        return <KeybindsTab/>;
    else if (name === "language")
        return <LanguageTab/>;
    else if (name === "streamer_mode")
        return <StreamerModeTab/>;
    else if (name === "advanced")
        return <AdvancedTab/>;
    else if (name === "activity_privacy")
        return <ActivityPrivacyTab/>;
    else if (name === "games")
        return <RegisteredGamesTab/>;
    else if (name === "hypesquad")
        return <HypesquadTab/>;
    else
        return <></>;
}