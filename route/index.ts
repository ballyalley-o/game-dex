import { Application } from 'express'
import { linkLeagueRoute } from 'route/league'
import { linkFranchiseRoute } from 'route/franchise'
import { linkPlayerRoute } from './player'
import { linkRoleRoute } from './role'
import { linkSdkRoute } from 'route/sdk'
import { linkSeasonRoute } from './season'
import { linkTeamRoute } from './team'

const mainRoute = (app: Application) => {
  linkSdkRoute(app)
  linkLeagueRoute(app)
  linkFranchiseRoute(app)
  linkPlayerRoute(app)
  linkRoleRoute(app)
  linkSeasonRoute(app)
  linkTeamRoute(app)
}

export { mainRoute }
