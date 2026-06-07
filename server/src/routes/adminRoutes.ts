import { writeLimiter, readLimiter } from '@/config/limiter'
import { UserManagementController } from '@/controllers/UserManagementController'
import { authenticate } from '@/middleware/auth'
import { authorizeRoles } from '@/middleware/role'
import { handleInputErrors } from '@/middleware/validation'
import { Router } from 'express'
import { body, param } from 'express-validator'

const router: Router = Router()

router.use(authenticate, authorizeRoles('Administrador'))

const accountValidators = [
  body('name').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Correo electrónico inválido'),
  body('academyId')
    .isInt({ min: 1 })
    .withMessage('La academia es obligatoria'),
]
const userIdValidator = param('userId')
  .isInt({ min: 1 })
  .withMessage('El ID del usuario debe ser válido')

router
  .route('/department-heads')
  .get(readLimiter, UserManagementController.listDepartmentHeads)
  .post(
    writeLimiter,
    accountValidators,
    handleInputErrors,
    UserManagementController.createDepartmentHead
  )

router.put(
  '/department-heads/:userId',
  writeLimiter,
  userIdValidator,
  accountValidators,
  handleInputErrors,
  UserManagementController.updateDepartmentHead
)
router.patch(
  '/department-heads/:userId/status',
  writeLimiter,
  userIdValidator,
  body('isActive').isBoolean().withMessage('El estado debe ser booleano'),
  handleInputErrors,
  UserManagementController.setDepartmentHeadActive
)
router.post(
  '/department-heads/:userId/reset-password',
  writeLimiter,
  userIdValidator,
  handleInputErrors,
  UserManagementController.resetDepartmentHeadPassword
)

export default router
