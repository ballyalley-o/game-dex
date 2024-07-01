import { Router } from 'express'
import { LeagueController } from 'controller'
import { SEGMENT } from 'constant'
import { PATH_DIR } from 'config'

const router = Router()

router.get(SEGMENT.ROOT, LeagueController.getAllLeague)
router.post(SEGMENT.ROOT, LeagueController.createLeague)
router.put(PATH_DIR.API_CODE, LeagueController.updateLeague)
router.delete(SEGMENT.ROOT, LeagueController.deleteLeague)

/**
 * Route for league module
 *
 * @path {baseUrl}/league
 */
const leagueRoute = router
export default leagueRoute
