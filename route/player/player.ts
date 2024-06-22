import { Router } from 'express'
import { PlayerController } from 'controller'
import { SEGMENT } from 'constant'

const router = Router()

router.get(SEGMENT.ROOT, PlayerController.getAllPlayer)

const playerRouter = router
export default playerRouter
