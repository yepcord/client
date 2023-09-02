export interface MessagePostRequest {
    channel_id: string,
    content?: string | null,
    nonce?: string | null,
}

export interface EditMeRequest {
    email?: string,
    password?: string,
    new_password?: string,
}

export interface EnableMfaRequest {
    password: string,
    secret?: string,
    code?: string,
}