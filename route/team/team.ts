import { Router } from 'express'
import { SDKSetController } from 'controller'
import { SEGMENT } from 'constant'

const router = Router()

router.post(SEGMENT.ROOT, SDKSetController.createTeamBase)

const teamRoute = router
export default teamRoute
