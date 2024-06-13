import { Router } from 'express'
import { LeagueController } from 'controller'
import { PATH_DIR } from 'config'
import { SEGMENT } from 'constant'

const router = Router()

router.post(SEGMENT.ROOT, LeagueController.createLeague)

/**
 * Route for league module
 *
 * @path {baseUrl}/league
 */
const leagueRoute = router
export default leagueRoute
