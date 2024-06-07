import { Application } from 'express'
import { linkApiRoute } from 'route/sdk'

const mainRoute = (app: Application) => {
  linkApiRoute(app)
}

export { mainRoute }
