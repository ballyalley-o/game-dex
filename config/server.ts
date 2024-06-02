import express, { Application } from 'express'
import goodlog from 'good-logs'
import { LogInitRequest } from 'decorator'
import { mainRoute } from 'route'
import { GLOBAL } from 'config/global'
import { KEY } from 'constant'
import dotenv from 'dotenv'
dotenv.config()

const PORT = GLOBAL.API_PORT
const ENV = GLOBAL.ENV

class App {
  private _app: Application

  static app() {
    const app = new App()
  }

  constructor() {
    this._app = express()
    this._app.use(express.json())
    this.registerRoute()
  }

  @LogInitRequest
  private registerRoute() {
    mainRoute(this._app)
  }

  public start() {
    let _ENV = ENV === KEY.DEVELOPMENT ? ('DEVELOPMENT' as keyof Env) : ('PRODUCTION' as keyof Env)

    try {
      this._app.listen(() => {
        goodlog.server(PORT, GLOBAL.API_VERSION, _ENV, true)
      })
    } catch (error: any) {
      process.on(KEY.UNHANDLED_REJECTION, (err) => {
        goodlog.server(PORT, GLOBAL.API_VERSION, _ENV, false)
        goodlog.error(error.message)
      })
    }
  }
}
