export default interface User {
    id: string,
    username: string,
    discriminator: string,
    avatar: string | null,
    banner: string | null,
    bio: string | null,
    bot: boolean,
}