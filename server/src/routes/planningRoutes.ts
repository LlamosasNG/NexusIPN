import { PlanningController } from '@/controllers/PlanningController'
import { authenticate } from '@/middleware/auth'
import { subjectExists } from '@/middleware/subject'
import { Router } from 'express'

const router: Router = Router()

router.use(authenticate)

router.param('subjectId', subjectExists)
router.post('/create/:subjectId', PlanningController.create)
router.get('/', authenticate, PlanningController.getAll)

export default router
