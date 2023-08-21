import {API_ENDPOINT} from "../constants";
import store from "../store";
import {MessagePostRequest} from "./types";

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
    errors: {
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

    static async getMessages(channel_id: string) {
        return await this.makeRequest({
            method: "GET",
            url: `channels/${channel_id}/messages`,
            authRequired: true,
            params: {
                limit: 50
            }
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
}