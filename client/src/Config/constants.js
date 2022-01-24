export const ls = Object.freeze({
    BEARER_TOKEN_KEY: "bearerToken",
    BEARER_TOKEN_EXPIRATION: "bearerTokenExp",
});

export const api = Object.freeze({
    URL_BASE: "http://127.0.0.1:8000/v1",
    URL_AUTH_TOKEN_TEST: "/auth/token/test",
    URL_AUTH_TOKEN: "/auth/token",
    URL_OPERATIONS: "/operations",
    URL_OPERATIONS_BALANCE: "/operations/balance",
    URL_USERS: "/users",
});

export const apiErrors = Object.freeze({
    ERRCOD_VALIDATION: "ERRVAL001",
    ERRCOD_NOT_FOUND: "RSRC001",
    ERRCOD_ALREADY_EXISTS: "RSRC002",
    ERRCOD_FORBIDDEN: "ACC001",
    ERRCOD_INVALID_TOKEN: "AUTH001",
    ERRCOD_INVALID_USERID: "AUTH002",
    ERRCOD_INVALID_CREDENTIALS: "AUTH003",
});