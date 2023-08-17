export enum GatewayOp {
    DISPATCH = 0,
    HEARTBEAT = 1,
    IDENTIFY = 2,
    STATUS = 3,
    VOICE_STATE = 4,
    VOICE_PING = 5,
    RESUME = 6,
    RECONNECT = 7,
    GUILD_MEMBERS = 8,
    INV_SESSION = 9,
    HELLO = 10,
    HEARTBEAT_ACK = 11,
    GUILD_SYNC = 12,
    UNKNOWN = 13,
    LAZY_REQUEST = 14,
}