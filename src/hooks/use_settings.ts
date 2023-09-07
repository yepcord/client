import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {PartialUserSettings} from "../types/user";
import {setSettings} from "../states/app";
import {updateSettings} from "../utils";

export default function useSettings() {
    const settings = useSelector((state: RootState) => state.app.settings);
    const dispatch = useDispatch();

    const patchSettings = (new_settings: PartialUserSettings, update: boolean = true) => {
        dispatch(setSettings(new_settings));
        if(update)
            updateSettings(settings, new_settings).then();
    }

    const toggleSettings = (name: string, update: boolean=true) => {
        const new_settings = {[name]: !settings[name as keyof typeof settings]}
        dispatch(setSettings(new_settings));
        if(update)
            updateSettings(settings, new_settings).then();
    }

    return {
        settings: settings,
        patchSettings: patchSettings,
        toggleSettings: toggleSettings
    };
}