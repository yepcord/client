import Snowflake from "./snowflake";

export default interface Emoji extends Snowflake {
    id: string,
    name: string,
    animated: boolean,
    managed: boolean,
    available: boolean,
    require_colons?: boolean,
    roles: unknown[],
}