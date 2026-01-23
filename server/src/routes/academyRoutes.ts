import { AcademyController } from '@/controllers/AcademyController'
import { Router } from 'express'

const router: Router = Router()

router.get('/', AcademyController.getAcademies)

export default router
