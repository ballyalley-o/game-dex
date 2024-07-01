import { Router } from 'express'
import { RoleController } from 'controller'
import { SEGMENT } from 'constant'

const router = Router()

router.get(SEGMENT.ROOT, RoleController.getAllRole)
router.get(SEGMENT.ID, RoleController.getRoleById)
router.post(SEGMENT.ROOT, RoleController.createRole)
router.put(SEGMENT.ID, RoleController.updateRole)
router.delete(SEGMENT.ID, RoleController.deleteRole)

const RoleRoute = router
export default RoleRoute
