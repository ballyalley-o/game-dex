import express, { Router, Request, Response } from 'express'
import { GLOBAL, PATH_DIR } from 'config'
import { KEY } from 'constant'

const API_WELCOME = (_req: Request, res: Response) => {
  const response = {
    name: GLOBAL.API_NAME,
    status: 'running',
    version: GLOBAL.API_VERSION,
    url: GLOBAL.API_URL,
    port: GLOBAL.API_PORT,
    environment: GLOBAL.ENV
  }
  res.status(200).send(response)
}

class AppRouter {
  private static _router: Router

  static get instance(): express.Router {
    if (!AppRouter._router) {
      AppRouter._router = express.Router()
    }

    return AppRouter._router
  }

  static serverRouter() {
    if (GLOBAL.ENV === KEY.DEVELOPMENT) {
      this._router?.get(PATH_DIR.API, API_WELCOME)
    } else {
      // TODO: when frontend is ready, change this
      this._router?.get(PATH_DIR.API, API_WELCOME)
    }
  }
}

export { AppRouter }
