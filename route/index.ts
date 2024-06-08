import { Application } from 'express'
import { linkSdkRoute } from 'route/sdk'

const mainRoute = (app: Application) => {
  linkSdkRoute(app)
}

export { mainRoute }
