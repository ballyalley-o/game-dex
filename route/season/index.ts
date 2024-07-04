import { Application } from 'express'
import { PATH_DIR } from 'config'
import seasonRoute from './season'

const linkSeasonRoute = (app: Application) => {
  app.use(PATH_DIR.SEASON, seasonRoute)
}

export { linkSeasonRoute }
