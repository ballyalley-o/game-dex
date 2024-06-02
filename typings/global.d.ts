declare interface IConNex {
  (...params: any[]): string
}

declare interface Env {
  PRODUCTION: 'production'
  DEVELOPMENT: 'development'
}

declare interface IsConnected {
  isConnected: boolean
  [key: string]: any
}
