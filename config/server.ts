import express, { Application } from 'express'
import goodlog from 'good-logs'
import morgan from 'morgan'
import { LogInitRequest, ConnectionStatus } from 'decorator'
import { mainRoute } from 'route'
import { AppRouter } from 'app-router'
import { GLOBAL, connectDb } from 'config'
import { KEY } from 'constant'
import dotenv from 'dotenv'
dotenv.config()

const PORT = GLOBAL.API_PORT
const ENV = GLOBAL.ENV

/**
 * Represents the main application class.
 */
class App {
  private _app: Application
  isConnected: boolean = false

  public static globalConfig = GLOBAL

  static app() {
    const app = new App()
    app.start()
    app.connectDb()
  }

  constructor() {
    this._app = express()
    this._app.use(express.json())
    this._app.use(morgan('combined'))
    this.registerRoute()
  }

  @LogInitRequest
  private registerRoute() {
    this._app.use(AppRouter.instance)
    AppRouter.serverRouter()
    mainRoute(this._app)
  }

  /**
   * Connects to the database.
   */
  public async connectDb() {
    try {
      await connectDb(true)
    } catch (error) {}
  }

  @ConnectionStatus
  /**
   * Starts the application server.
   */
  public start() {
    let _ENV = ENV === KEY.DEVELOPMENT ? ('DEVELOPMENT' as keyof Env) : ('PRODUCTION' as keyof Env)

    try {
      this._app.listen(PORT, () => {
        goodlog.server(PORT, GLOBAL.API_VERSION, _ENV, this.isConnected)
      })
    } catch (error: any) {
      process.on(KEY.UNHANDLED_REJECTION, (err) => {
        goodlog.server(PORT, GLOBAL.API_VERSION, _ENV, this.isConnected)
        goodlog.error(error.message)
        this.isConnected = false
      })
    }
  }
}

export default App
