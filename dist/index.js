"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
/**
 * Middleware for handling responses to the client
 */
class ResponseHandler {
    /**
       * Handles success or fail responses
       * @param {String | Object} param
       * @param {String} status - success or fail
       */
    static successOrFail(param, status) {
        if (!param) {
            throw new Error('Method parameter cannot be undefined or null (ResponseHandler)');
        }
        let data = param;
        const response = { status };
        if (data.message) {
            response.message = data.message;
            delete data.message;
        }
        else if (typeof data === 'string') {
            response.message = data;
            data = {};
        }
        response.data = data.data || data;
        if (Object.keys(response.data).length === 0) {
            delete response.data;
        }
        return response;
    }
    /**
       * Handles error responses
       * @param {any} error
       */
    static error(error) {
        let response = { status: 'error' };
        if (error && typeof error === 'object') {
            response = Object.assign(response, error);
        }
        else {
            response.message = error || 'An error occurred';
        }
        return response;
    }
}
exports.ResponseHandler = ResponseHandler;
exports.default = (req, res, next) => {
    res.successResponse = (data, statusCode = 200) => res
        .status(statusCode)
        .json(ResponseHandler.successOrFail(data, 'success'));
    res.failResponse = (data, statusCode = 400) => res
        .status(statusCode)
        .json(ResponseHandler.successOrFail(data, 'fail'));
    res.errorResponse = (error, statusCode = 500) => res
        .status(statusCode)
        .json(ResponseHandler.error(error));
    return next();
};
//# sourceMappingURL=index.js.map