import { Application } from 'express'
import { PATH_DIR } from 'config'
import teamRoute from './team'

const linkTeamRoute = (app: Application) => {
  app.use(PATH_DIR.TEAM, teamRoute)
}

export { linkTeamRoute }
