import { Router } from 'express'
import { SDKSetController } from 'controller'
import { PATH_DIR } from 'config'
import { SEGMENT } from 'constant'

const router = Router()

router.post(SEGMENT.ROOT, SDKSetController.createFranchiseHistory)

const franchiseRoute = router
export default franchiseRoute
