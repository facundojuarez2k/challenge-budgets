/**
 * This file contains common constant values
 */
'use strict'

exports.responseCodes = Object.freeze({
    invalidToken: {
        status: 401,
        details: {
            code: "AUTH001",
            message: "Invalid token"
        }
    },
    invalidUserId: {
        status: 401,
        details: {
            code: "AUTH002",
            message: "Invalid user ID"
        }
    },
    invalidCredentials: {
        status: 400,
        details: {
            code: "AUTH003",
            message: "Invalid credentials"
        }
    },
});