export interface MessagePostRequest {
    channel_id: string,
    content?: string | null,
    nonce?: string | null,
}