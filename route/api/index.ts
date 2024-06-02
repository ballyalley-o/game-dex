import { Application } from 'express'
import { PATH_DIR } from 'config'
import apiRoute from 'route/api/api'

const linkApiRoute = (app: Application) => {
  app.use(PATH_DIR.API, apiRoute)
}

export { linkApiRoute }
