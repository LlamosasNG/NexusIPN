import { readLimiter } from '@/config/limiter'
import { DigitalDidacticResourceController } from '@/controllers/DigitalDidacticResourceController'
import { handleInputErrors } from '@/middleware/validation'
import { Router } from 'express'
import { param } from 'express-validator'

const router: Router = Router()

router.get(
  '/resources/:publicSlug',
  readLimiter,
  param('publicSlug')
    .isString()
    .isLength({ min: 12, max: 80 })
    .withMessage('El identificador público no es válido'),
  handleInputErrors,
  DigitalDidacticResourceController.getPublic
)

export default router
