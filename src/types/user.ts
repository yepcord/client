export default interface User {
    id: string,
    username: string,
    discriminator: string,
    avatar: string | null,
    banner: string | null,
    bio: string | null,
    bot: boolean,
}

interface PresenceActivity {
    name: string,
    type: number,
    state: string,
    emoji: {
        emoji_id: string,
        emoji_name: string,
    } | null,
    timestamps: {
        start?: number,
        end?: number,
    } | null
}

export interface Presence {
    userId: string,
    status: "online" | "offline" | "idle" | "dnd",
    activities: PresenceActivity[]
}