import dotenv from 'dotenv'
dotenv.config()

/**
 * Global configuration object for the NBA API.
 */
export const GLOBAL = {
  /**
   * The name of the API.
   */
  API_NAME: 'NBA api',

  /**
   * The port number for the API. Defaults to 3005 if not provided in the environment variables.
   */
  API_PORT: process.env.API_PORT || 3005,

  /**
   * The port number for the SDK. Defaults to 3006 if not provided in the environment variables.
   */
  SDK_PORT: process.env.SDK_PORT || 3006,

  /**
   * The version of the API. Defaults to an empty string if not provided in the environment variables.
   */
  API_VERSION: process.env.API_VERSION || '',

  /**
   * The URL for the API. Must be provided in the environment variables.
   */
  API_URL: process.env.API_URL,

  /**
   * The URL for the SDK. Must be provided in the environment variables.
   *
   * @url http://127.0.0.1:5001
   */
  SDK_URL: process.env.SDK_URL,

  /**
   * The URI for the database. Must be provided in the environment variables.
   */
  DB_URI: process.env.DB_URI,

  /**
   * Retrieves the host of the database connection.
   * @param db - The database object.
   * @returns The host of the database connection.
   */
  DB_HOST: (db: any) => db.connection.host,

  /**
   * Retrieves the name of the database connection.
   * @param db - The database object.
   * @returns The name of the database connection.
   */
  DB_NAME: (db: any) => db.connection.name,

  /**
   * The environment mode. Defaults to 'development' if not provided in the environment variables.
   */
  ENV: process.env.ENV || 'development'
}
