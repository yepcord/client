import Channel from "../../types/channel";

export interface ChannelsH {
    [key: string]: {
        channel: Channel,
        channels: Channel[],
    }
}

export interface ChannelsHValues {
    channel: Channel,
    channels: Channel[],
}