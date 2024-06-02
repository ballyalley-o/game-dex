import { Application } from 'express'
import { linkApiRoute } from 'route/api'

const mainRoute = (app: Application) => {
  linkApiRoute(app)
}

export { mainRoute }
