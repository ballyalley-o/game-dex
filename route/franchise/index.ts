import { Application } from 'express'
import { PATH_DIR } from 'config'
import franchiseRoute from './franchise'

const linkFranchiseRoute = (app: Application) => {
  app.use(PATH_DIR.FRANCHISE, franchiseRoute)
}

export { linkFranchiseRoute }
