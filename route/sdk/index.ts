import { Application } from 'express'
import { PATH_DIR } from 'config'
import sdkRoute from 'route/sdk/sdk'

const linkSdkRoute = (app: Application) => {
  app.use(PATH_DIR.SDK, sdkRoute)
}

export { linkSdkRoute }
