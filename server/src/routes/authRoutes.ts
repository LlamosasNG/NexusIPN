import {
  authLimiter,
  confirmAccountLimiter,
  createAccountLimiter,
  forgotPasswordLimiter,
  loginLimiter,
} from '@/config/limiter'
import { AuthController } from '@/controllers/AuthController'
import { authenticate } from '@/middleware/auth'
import { handleInputErrors } from '@/middleware/validation'
import { Router } from 'express'
import { body, param } from 'express-validator'

const router: Router = Router()

router.post(
  '/create-account',
  createAccountLimiter,
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
  body('email').isEmail().withMessage('Correo electrónico inválido'),
  body('academyId')
    .optional()
    .isInt()
    .withMessage('El ID de la academia debe ser un número válido'),
  handleInputErrors,
  AuthController.createAccount
)

router.post(
  '/confirm-account',
  confirmAccountLimiter,
  body('token')
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage('Token inválido'),
  handleInputErrors,
  AuthController.confirmAccount
)

router.post(
  '/login',
  loginLimiter,
  body('email').isEmail().withMessage('Correo electrónico inválido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  handleInputErrors,
  AuthController.login
)

router.post(
  '/request-code',
  authLimiter,
  body('email').isEmail().withMessage('Correo electrónico inválido'),
  handleInputErrors,
  AuthController.requestConfirmationCode
)

router.post(
  '/forgot-password',
  forgotPasswordLimiter,
  body('email').isEmail().withMessage('Correo electrónico inválido'),
  handleInputErrors,
  AuthController.forgotPassword
)

router.post(
  '/validate-token',
  authLimiter,
  body('token').isLength({ min: 6, max: 6 }).withMessage('Token inválido'),
  handleInputErrors,
  AuthController.validateToken
)

router.post(
  '/reset-password/:token',
  authLimiter,
  param('token').isLength({ min: 6, max: 6 }).withMessage('Token inválido'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
  handleInputErrors,
  AuthController.resetPassword
)

router.get('/user', authenticate, AuthController.user)

export default router
