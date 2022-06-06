const messages = {
    LOGIN_SUCCESS: {
        respnseType: "LOGIN_SUCCESSFUL",
        message: "You have been logged in successfully.",
        status: "OK",
        success: true
    },
    REGISTER_SUCCESS: {
        respnseType: "REGISTER_SUCCESSFUL",
        message: "You are registered successfully.",
        status: "OK",
        success: true
    },
    INVALID_CREDENTIALS: {
        respnseType: "INVALID_CREDENTIALS",
        message: "wrong credentials.",
        status: "INVALID",
        success: false
    },
    UNAUTHORIZED_ACCESS: {
        respnseType: "UNAUTHORIZED_ACCESS",
        message: "Your session has been expired, Please re-login.",
        status: "EXPIRED",
        success: false
    },
    SERVER_ERROR: {
        respnseType: "SERVER_ERROR",
        message: "Something went wrong!",
        status: "SERVER_ERROR",
        success: false
    },
    RECORD_CREATED: {
        respnseType: "RECORD_CREATED",
        message: "Record created successfully",
        status: "CREATED",
        success: true
    },
    RECORD_DELETE: {
        respnseType: "RECORD_DELETE",
        message: "Record deleted successfully",
        status: "DELETED",
        success: true
    },
    RECORD_UPDATED: {
        respnseType: "RECORD_UPDATED",
        message: "Record updated successfully",
        status: "UPDATED",
        success: true
    },
    RECORD_FOUND: {
        respnseType: "RECORD_FOUND",
        message: "Record retrive successfully.",
        status: "OK",
        success: true
    },
    RECORD_NOT_FOUND: {
        respnseType: "RECORD_NOT_FOUND",
        message: "Record not found!",
        status: "NOT_FOUND",
        success: false
    },
    ALREADY_EXIST: {
        respnseType: "ALREADY_EXIST",
        message: "Already exist!",
        status: "EXIST",
        success: false
    },
    BAD_REQUEST: {
        respnseType: "BAD_REQUEST",
        message: "Bad request!",
        status: "BAD_REQUEST",
        success: false
    }
}

module.exports = messages