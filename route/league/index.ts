import { Application } from 'express'
import { PATH_DIR } from 'config'
import leagueRoute from 'route/league/league'

const linkLeagueRoute = (app: Application) => {
  app.use(PATH_DIR.LEAGUE, leagueRoute)
}

export { linkLeagueRoute }
