import {Presence} from "../../../types/user";
import store from "../../../store";
import {addPresences} from "../../../states/users";

export interface ReadySupplementalHandlerData {
    guilds: {
        embedded_activities: unknown[],
        id: string,
        voice_states: unknown[]
    }[],
    merged_members: unknown[],
    merged_presences: {
        friends: Presence[],
        guilds: Presence[],
    }
}

export default function readySupplementalHandler(data: ReadySupplementalHandlerData) {
    store.dispatch(addPresences(data.merged_presences.friends));
    store.dispatch(addPresences(data.merged_presences.guilds));
}