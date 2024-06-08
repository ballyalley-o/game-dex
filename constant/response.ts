import { CODE } from 'constant'

/**
 * Object containing success response functions.
 */
export const SUCCESS = {
  /**
   * Returns a success response with OK status code.
   * @param data - The data to be included in the response.
   * @returns The success response object.
   */
  OK: (data: any) => {
    return {
      success: true,
      code: CODE.OK,
      message: 'Request successful',
      data
    }
  },
  /**
   * Returns a success response with CREATED status code.
   * @param data - The data to be included in the response.
   * @returns The success response object.
   */
  CREATED: (data: any) => {
    return {
      success: true,
      code: CODE.CREATED,
      message: 'Resource created',
      data
    }
  },
  /**
   * Returns a success response with ACCEPTED status code.
   * @param data - The data to be included in the response.
   * @returns The success response object.
   */
  ACCEPTED: (data: any) => {
    return {
      success: true,
      code: CODE.ACCEPTED,
      message: 'Resource created',
      data
    }
  },
  /**
   * Returns a success response with NO_CONTENT status code.
   * @param data - The data to be included in the response.
   * @returns The success response object.
   */
  NO_CONTENT: (data: any) => {
    return {
      success: true,
      code: CODE.NO_CONTENT,
      message: 'Resource deleted',
      data: null
    }
  }
}

/**
 * Represents the error response object.
 */
export const ERROR = {
  /**
   * Represents a bad request error.
   * @param message - The error message.
   * @returns The error response object.
   */
  BAD_REQUEST: (message: string) => {
    return {
      success: false,
      code: CODE.BAD_REQUEST,
      message
    }
  },
  /**
   * Represents an unauthorized error.
   * @param message - The error message.
   * @returns The error response object.
   */
  UNAUTHORIZED: (message: string) => {
    return {
      success: false,
      code: CODE.UNAUTHORIZED,
      message
    }
  },
  /**
   * Represents a forbidden error.
   * @param message - The error message.
   * @returns The error response object.
   */
  FORBIDDEN: (message: string) => {
    return {
      success: false,
      code: CODE.FORBIDDEN,
      message
    }
  },
  /**
   * Represents a not found error.
   * @param message - The error message.
   * @returns The error response object.
   */
  NOT_FOUND: (message: string) => {
    return {
      success: false,
      code: CODE.NOT_FOUND,
      message
    }
  },
  /**
   * Represents a method not allowed error.
   * @param message - The error message.
   * @returns The error response object.
   */
  METHOD_NOT_ALLOWED: (message: string) => {
    return {
      success: false,
      code: CODE.METHOD_NOT_ALLOWED,
      message
    }
  },
  /**
   * Represents a request timeout error.
   * @param message - The error message.
   * @returns The error response object.
   */
  REQUEST_TIMEOUT: (message: string) => {
    return {
      success: false,
      code: CODE.REQUEST_TIMEOUT,
      message
    }
  },
  /**
   * Represents a conflict error.
   * @param message - The error message.
   * @returns The error response object.
   */
  CONFLICT: (message: string) => {
    return {
      success: false,
      code: CODE.CONFLICT,
      message
    }
  },
  /**
   * Represents a gone error.
   * @param message - The error message.
   * @returns The error response object.
   */
  GONE: (message: string) => {
    return {
      success: false,
      code: CODE.GONE,
      message
    }
  },
  /**
   * Represents an unsupported media type error.
   * @param message - The error message.
   * @returns The error response object.
   */
  UNSUPPORTED_MEDIA_TYPE: (message: string) => {
    return {
      success: false,
      code: CODE.UNSUPPORTED_MEDIA_TYPE,
      message
    }
  },
  /**
   * Represents an unprocessable entity error.
   * @param message - The error message.
   * @returns The error response object.
   */
  UNPROCESSABLE_ENTITY: (message: string) => {
    return {
      success: false,
      code: CODE.UNPROCESSABLE_ENTITY,
      message
    }
  },
  /**
   * Represents a too many requests error.
   * @param message - The error message.
   * @returns The error response object.
   */
  TOO_MANY_REQUESTS: (message: string) => {
    return {
      success: false,
      code: CODE.TOO_MANY_REQUESTS,
      message
    }
  },
  /**
   * Represents an internal server error.
   * @param message - The error message.
   * @returns The error response object.
   */
  INTERNAL_SERVER_ERROR: (message: string) => {
    return {
      success: false,
      code: CODE.INTERNAL_SERVER_ERROR,
      message
    }
  }
}

const PY = {
  ON: 'Pipe data from python script ...',
  CLOSE: (code: any) => `child process close all stdio with code ${code}`
}

export const MESSAGE = {
  NO_ID: 'No ID provided',
  NO_ABBV: 'No abbreviation provided',
  NOT_FOUND: 'Resource not found'
}

export const RESPONSE = {
  ...{ MESSAGE },
  ...PY,
  ...SUCCESS,
  ...ERROR
}
