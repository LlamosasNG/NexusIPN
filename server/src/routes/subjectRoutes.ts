import { SubjectController } from '@/controllers/SubjectController'
import { authenticate } from '@/middleware/auth'
import { handleInputErrors } from '@/middleware/validation'
import { Router } from 'express'
import { body, param } from 'express-validator'

const router: Router = Router()

router.use(authenticate)
router.post(
  '/assign-subjects',
  body('subjectIds')
    .isArray({ min: 1, max: 5 })
    .withMessage('Debes seleccionar entre 1 y 5 materias'),
  body('subjectIds.*')
    .isInt()
    .withMessage('Los IDs de las materias deben ser números válidos'),
  body('period')
    .optional()
    .isString()
    .withMessage('El período debe ser una cadena de texto'),
  handleInputErrors,
  SubjectController.assignSubjects
)

router.get(
  '/:academyId',
  param('academyId')
    .isInt()
    .withMessage('El ID de la academia debe ser un número válido'),
  handleInputErrors,
  SubjectController.getSubjectsByAcademy
)

router.delete(
  '/:subjectId',
  param('subjectId')
    .isInt()
    .withMessage('El ID de la materia debe ser un número válido'),
  handleInputErrors,
  SubjectController.removeSubject
)

export default router
