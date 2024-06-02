import dotenv from 'dotenv'
dotenv.config()

export const GLOBAL = {
  API_NAME: 'NBA api',
  API_PORT: process.env.API_PORT || 3005,
  API_VERSION: process.env.API_VERSION || '',
  API_URL: process.env.API_URL,
  //  :database
  DB_URI: process.env.DB_URI,
  // :env
  ENV: process.env.ENV || 'development'
}
