export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://127.0.0.1:8000/api/v9";
export const GATEWAY_ENDPOINT = process.env.REACT_APP_GATEWAY_ENDPOINT || "wss://127.0.0.1:8000/gateway";
export const REMOTE_AUTH_ENDPOINT = process.env.REACT_APP_REMOTE_AUTH_ENDPOINT || "wss://127.0.0.1:8000/remote-auth";
export const MEDIA_ENDPOINT = process.env.REACT_APP_MEDIA || "https://127.0.0.1:8000/media";
export const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL || "https://127.0.0.1:8080";
export const SNOWFLAKE_EPOCH = 1640995200000;

export const VERSION_NUMBER = 1;
export const INSTANCE_NAME = process.env.REACT_APP_INSTANCE_NAME || "YEPCord";