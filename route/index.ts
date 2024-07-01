import { Application } from 'express'
import { linkSdkRoute } from 'route/sdk'
import { linkLeagueRoute } from 'route/league'
import { linkFranchiseRoute } from 'route/franchise'
import { linkPlayerRoute } from './player'
import { linkTeamRoute } from './team'
import { linkRoleRoute } from './role'

const mainRoute = (app: Application) => {
  linkSdkRoute(app)
  linkLeagueRoute(app)
  linkFranchiseRoute(app)
  linkTeamRoute(app)
  linkPlayerRoute(app)
  linkRoleRoute(app)
}

export { mainRoute }
