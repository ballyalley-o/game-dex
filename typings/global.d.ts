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

declare interface UserRequest {
  user: {
    id: string
    role: string
  }
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

declare const METHODS: {
  GET: Method
  POST: Method
  PUT: Method
  DELETE: Method
}
