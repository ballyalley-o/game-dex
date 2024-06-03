import { Router } from 'express'
import { ApiController } from 'controller'

const router = Router()

router.get('/get', ApiController.getApi)

const apiRoute = router
export default apiRoute
