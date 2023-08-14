import Channel from "./channel";

export default interface Guild {
    id: string,
    name: string,
    icon?: string | null,
    channels: {
        [key:string]: Channel,
    },
}