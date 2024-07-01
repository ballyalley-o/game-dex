import { Application } from 'express'
import { PATH_DIR } from 'config'
import roleRoute from './role'

const linkRoleRoute = (app: Application) => {
  app.use(PATH_DIR.ROLE, roleRoute)
}

export { linkRoleRoute }
