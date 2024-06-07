import { Router } from 'express'
import { SDKController } from 'controller'

const router = Router()

router.get('/team', SDKController.getAllTeam)
router.get('/team/:id', SDKController.getTeam)
router.get('/player', SDKController.getAllPlayer)
router.get('/player/:id', SDKController.getAllPlayer)
router.get('/draft/history', SDKController.getDraftHistory)

const sdkRoute = router
export default sdkRoute
