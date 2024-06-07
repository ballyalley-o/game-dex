import { Application } from 'express'
import { PATH_DIR } from 'config'
import sdkRoute from 'route/sdk/sdk'

const linkApiRoute = (app: Application) => {
  app.use(PATH_DIR.SDK, sdkRoute)
}

export { linkApiRoute }
