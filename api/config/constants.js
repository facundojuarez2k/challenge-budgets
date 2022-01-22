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
    validationError: {
        status: 422,
        details: {
            code: "ERRVAL001",
            message: "Validation error"
        }
    },
    forbidden: {
        status: 403,
        details: {
            code: "ACC001",
            message: "Permission to resource denied"
        }
    },
    notFound: {
        status: 404,
        details: {
            code: "RSRC001",
            message: "Resource not found"
        }
    },
    alreadyExists: {
        status: 409,
        details: {
            code: "RSRC002",
            message: "Resource already exists"
        }
    }
});