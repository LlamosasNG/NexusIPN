import { readLimiter } from '@/config/limiter'
import { SubjectController } from '@/controllers/SubjectController'
import { authenticate } from '@/middleware/auth'
import { subjectExists } from '@/middleware/subject'
import { handleInputErrors } from '@/middleware/validation'
import { Router } from 'express'
import { param } from 'express-validator'

const router: Router = Router()

router.use(authenticate)

router.get('/my-subjects', readLimiter, SubjectController.getByUser)

router.get(
  '/academy/:academyId',
  readLimiter,
  param('academyId')
    .isInt()
    .withMessage('El ID de la academia debe ser un número válido'),
  handleInputErrors,
  SubjectController.getByAcademy
)

router.param('subjectId', subjectExists)
router.get('/:subjectId', readLimiter, SubjectController.subject)

export default router
