import { readLimiter, writeLimiter } from '@/config/limiter'
import { UserManagementController } from '@/controllers/UserManagementController'
import { authenticate } from '@/middleware/auth'
import { authorizeRoles } from '@/middleware/role'
import { handleInputErrors } from '@/middleware/validation'
import { Router } from 'express'
import { body, param } from 'express-validator'

const router: Router = Router()

router.use(authenticate, authorizeRoles('Jefe de Departamento'))

const teacherValidators = [
  body('name').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Correo electrónico inválido'),
  body('subjectIds')
    .isArray({ min: 1, max: 5 })
    .withMessage('Debes seleccionar entre 1 y 5 unidades de aprendizaje'),
  body('subjectIds.*').isInt({ min: 1 }),
  body('period')
    .matches(/^\d{4}-[12]$/)
    .withMessage('El periodo debe tener formato YYYY-S'),
]
const userIdValidator = param('userId')
  .isInt({ min: 1 })
  .withMessage('El ID del usuario debe ser válido')

router
  .route('/')
  .get(readLimiter, UserManagementController.listTeachers)
  .post(
    writeLimiter,
    teacherValidators,
    handleInputErrors,
    UserManagementController.createTeacher
  )

router.put(
  '/:userId',
  writeLimiter,
  userIdValidator,
  teacherValidators,
  handleInputErrors,
  UserManagementController.updateTeacher
)
router.patch(
  '/:userId/status',
  writeLimiter,
  userIdValidator,
  body('isActive').isBoolean().withMessage('El estado debe ser booleano'),
  handleInputErrors,
  UserManagementController.setTeacherActive
)
router.post(
  '/:userId/reset-password',
  writeLimiter,
  userIdValidator,
  handleInputErrors,
  UserManagementController.resetTeacherPassword
)

export default router
