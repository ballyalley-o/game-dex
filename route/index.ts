import { Application } from 'express'
import { linkSdkRoute } from 'route/sdk'
import { linkLeagueRoute } from 'route/league'
import { linkFranchiseRoute } from 'route/franchise'

const mainRoute = (app: Application) => {
  linkSdkRoute(app)
  linkLeagueRoute(app)
  linkFranchiseRoute(app)
}

export { mainRoute }
