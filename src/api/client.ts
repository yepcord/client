import {API_ENDPOINT} from "../constants";
import store from "../store";
import {EditMeRequest, EnableMfaRequest, MessagePostRequest} from "./types";
import {RelationshipType} from "../types/user";

interface MakeRequestProps {
    method: string,
    url: string,
    params?: {
        [key: string]: any
    },
    body?: any | null,
    authRequired?: boolean,
}

interface Response {
    body: { [key: string]: any } | null | any[],
    status: number,
}

export interface ErrorResponse {
    code: number,
    errors?: {
        [key: string]: {
            _errors: {
                code: string,
                message: string,
            }[]
        }
    },
    message: string,
}

function isJson(obj: any) {
    return Array.isArray(obj) || (obj != null && typeof obj == 'object');
}

export default class ApiClient {
    static async makeRequest({
                          method = "GET",
                          url,
                          params = {},
                          body,
                          authRequired = true
                      }: MakeRequestProps): Promise<Response> {
        const headers: { [key: string]: string } = {};
        const token = store.getState().app.token;
        if (authRequired && token !== null) {
            headers["Authorization"] = token;
        }
        if (["POST", "PATCH", "PUT", "DELETE"].includes(method) && isJson(body))
            headers["Content-Type"] = "application/json";

        const options: RequestInit = {
            "method": method,
            "headers": headers,
        };
        if (isJson(body))
            options["body"] = JSON.stringify(body);

        let query = Object.keys(params).map(
            item => `${encodeURIComponent(item)}=${encodeURIComponent(params[item])}`
        ).join("&");
        if (query)
            query = `?${query}`;

        let resp = await fetch(`${API_ENDPOINT}/${url}${query}`, options);
        let resp_body = null;
        try {
            resp_body = await resp.json();
        } catch (e) {
        }

        return {
            body: resp_body,
            status: resp.status,
        }
    }

    static async login(email: string, password: string) {
        return await this.makeRequest({
            method: "POST",
            url: "auth/login",
            authRequired: false,
            body: {
                "login": email,
                "password": password
            }
        });
    }

    static async register(email: string, password: string, username: string, date_of_birth: string) {
        return await this.makeRequest({
            method: "POST",
            url: "auth/register",
            authRequired: false,
            body: {
                "email": email,
                "password": password,
                "username": username,
                "date_of_birth": date_of_birth
            }
        });
    }

    static async logout() {
        return await this.makeRequest({
            method: "POST",
            url: "auth/logout",
            authRequired: true,
        });
    }

    static async getMessages(channel_id: string, before: string | null = null) {
        let params: {[key:string]: any} = {
            limit: 50,
        }
        if(before)
            params["before"] = before;

        return await this.makeRequest({
            method: "GET",
            url: `channels/${channel_id}/messages`,
            authRequired: true,
            params: params
        });
    }

    static async postMessages(data: MessagePostRequest) {
        const req_data = (({ channel_id, ...o }) => o)(data);
        return await this.makeRequest({
            method: "POST",
            url: `channels/${data.channel_id}/messages`,
            authRequired: true,
            body: req_data
        });
    }

    static async deleteRelationship(user_id: string) {
        return await this.makeRequest({
            method: "DELETE",
            url: `users/@me/relationships/${user_id}`,
            authRequired: true,
        });
    }

    static async requestRelationship(username: string, discriminator: string) {
        return await this.makeRequest({
            method: "POST",
            url: `users/@me/relationships`,
            authRequired: true,
            body: {
                "username": username,
                "discriminator": discriminator,
            }
        });
    }

    static async getOrCreateDmChannel(user_id: string) {
        return await this.makeRequest({
            method: "POST",
            url: `users/@me/channels`,
            authRequired: true,
            body: {
                "recipients": [user_id],
            }
        });
    }

    static async blockUser(user_id: string) {
        return await this.makeRequest({
            method: "PUT",
            url: `users/@me/relationships/${user_id}`,
            authRequired: true,
            body: {
                "type": RelationshipType.BLOCK,
            }
        });
    }

    static async acceptRelationship(user_id: string) {
        return await this.makeRequest({
            method: "PUT",
            url: `users/@me/relationships/${user_id}`,
            authRequired: true,
            body: {
                "type": RelationshipType.FRIEND,
            },
        });
    }

    static async deleteChannel(channel_id: string) {
        return await this.makeRequest({
            method: "DELETE",
            url: `channels/${channel_id}`,
            authRequired: true,
        });
    }

    static async getUserProfile(user_id: string, with_mutual_guilds: boolean=true, with_mutual_friends_count: boolean=false) {
        return await this.makeRequest({
            method: "GET",
            url: `users/${user_id}/profile`,
            authRequired: true,
            params: {
                with_mutual_guilds: with_mutual_guilds,
                with_mutual_friends_count: with_mutual_friends_count,
            }
        });
    }

    static async editMe(request: EditMeRequest) {
        return await this.makeRequest({
            method: "PATCH",
            url: `users/@me`,
            authRequired: true,
            body: request
        });
    }

    static async enableMfa(request: EnableMfaRequest) {
        return await this.makeRequest({
            method: "POST",
            url: `users/@me/mfa/totp/enable`,
            authRequired: true,
            body: request
        });
    }

    static async disableMfa(code: string) {
        return await this.makeRequest({
            method: "POST",
            url: `users/@me/mfa/totp/disable`,
            authRequired: true,
            body: {
                code: code,
            }
        });
    }

    static async viewBackupCodesChallenge(password: string) {
        return await this.makeRequest({
            method: "POST",
            url: `auth/verify/view-backup-codes-challenge`,
            authRequired: true,
            body: {
                password: password,
            }
        });
    }

    static async viewBackupCodes(key: string, nonce: string) {
        return await this.makeRequest({
            method: "POST",
            url: `users/@me/mfa/codes-verification`,
            authRequired: true,
            body: {
                key: key,
                nonce: nonce,
                regenerate: false,
            }
        });
    }

    static async regenerateBackupCodes(key: string, nonce: string) {
        return await this.makeRequest({
            method: "POST",
            url: `users/@me/mfa/codes-verification`,
            authRequired: true,
            body: {
                key: key,
                nonce: nonce,
                regenerate: true,
            }
        });
    }
}