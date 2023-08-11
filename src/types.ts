export interface Server {
    id: string,
    name: string,
    icon?: string | null,
}

export interface Channel {
    id: string,
    type: number,
    name?: string | null,
    icon?: string | null,
}