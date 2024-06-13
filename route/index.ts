import { Application } from 'express'
import { linkSdkRoute } from 'route/sdk'
import { linkLeagueRoute } from 'route/league'

const mainRoute = (app: Application) => {
  linkSdkRoute(app)
  linkLeagueRoute(app)
}

export { mainRoute }
