/**
 * Middleware for handling responses to the client
 */
 export class ResponseHandler {
    /**
       * Handles success or fail responses
       * @param {String | Object} param
       * @param {String} status - success or fail
       */
    static successOrFail(param:String | Object, status:String) {
      if (!param) {
        throw new Error('Method parameter cannot be undefined or null (ResponseHandler)');
      }
  
      let data:any = param;
  
      const response:any = { status };
  
      if (data.message) {
        response.message = data.message;
        delete data.message;
      } else if (typeof data === 'string') {
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
    static error(error:any) {
      let response:any = { status: 'error' };
  
      if (error && typeof error === 'object') {
        response = Object.assign(response, error);
      } else {
        response.message = error || 'An error occurred';
      }
  
      return response;
    }
  }
  
  export default (req:any, res:any, next:any) => {
    res.successResponse = (data:String, statusCode:Number = 200) => res
      .status(statusCode)
      .json(ResponseHandler.successOrFail(data, 'success'));
  
    res.failResponse = (data:any, statusCode = 400) => res
      .status(statusCode)
      .json(ResponseHandler.successOrFail(data, 'fail'));
  
    res.errorResponse = (error:any, statusCode = 500) => res
      .status(statusCode)
      .json(ResponseHandler.error(error));
  
    return next();
  };