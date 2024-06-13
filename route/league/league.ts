import { Router } from 'express'
import { LeagueController } from 'controller'
import { SEGMENT } from 'constant'

const router = Router()

router.get(SEGMENT.ROOT, LeagueController.getAllLeague)
router.post(SEGMENT.ROOT, LeagueController.createLeague)
router.put(SEGMENT.ROOT, LeagueController.updateLeague)
router.delete(SEGMENT.ROOT, LeagueController.deleteLeague)

/**
 * Route for league module
 *
 * @path {baseUrl}/league
 */
const leagueRoute = router
export default leagueRoute
