import store from "../../../../store";
import {setSettings} from "../../../../states/app";
import {b64decode, mergeProtoSettings} from "../../../../utils";
import {PreloadedUserSettings} from "../../../../proto/discord";

export interface SettingsProtoUpdateHandlerData {
    partial?: boolean,
    settings: {
        proto: string,
        type: 1 | 2 | 3,
    }
}

export default function userSettingsProtoUpdateHandler(data: SettingsProtoUpdateHandlerData) {
    let binary = b64decode(data.settings.proto);
    if (data.settings.type === 1)
        store.dispatch(
            setSettings(mergeProtoSettings(store.getState().app.settings, PreloadedUserSettings.fromBinary(binary)))
        );
}