import { Router } from 'express'
import { SeasonController } from 'controller'
import { PATH_DIR } from 'config'
import { SEGMENT } from 'constant'

const router = Router()

router.get(SEGMENT.ROOT, SeasonController.getAllSeason)
router.get(SEGMENT.ID, SeasonController.getSeason)
router.post(SEGMENT.ROOT, SeasonController.createAllNBASeason)
router.post(SEGMENT.ID, SeasonController.createSeason)
router.put(SEGMENT.ID, SeasonController.updateSeason)
router.delete(SEGMENT.ID, SeasonController.deleteSeason)

const seasonRoute = router
export default seasonRoute
