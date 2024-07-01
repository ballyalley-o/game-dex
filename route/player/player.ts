import { Router } from 'express'
import { PlayerController } from 'controller'
import { SEGMENT } from 'constant'
import { PATH_DIR } from 'config'

const router = Router()

router.get(SEGMENT.ROOT, PlayerController.getAllPlayer)
router.get(PATH_DIR.ID, PlayerController.getPlayerById)
router.put(SEGMENT.ROOT, PlayerController.updateAllPlayer)
router.put(PATH_DIR.ID, PlayerController.updatePlayerById)
router.delete(PATH_DIR.ID, PlayerController.deletePlayerById)

const playerRouter = router
export default playerRouter
