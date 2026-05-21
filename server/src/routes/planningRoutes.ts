import { DidacticOrganizationController } from '@/controllers/DidacticOrganizationController'
import { GeneralDataController } from '@/controllers/GeneralDataController'
import { PlagiarismToolController } from '@/controllers/PlagiarismToolController'
import { PlanningController } from '@/controllers/PlanningController'
import { ReferenceController } from '@/controllers/ReferenceController'
import { ThematicUnitController } from '@/controllers/ThematicUnitController'
import { TransversalAxisController } from '@/controllers/TransversalAxisController'
import { authenticate } from '@/middleware/auth'
import { ensureEditablePlanning } from '@/middleware/planning'
import { hasAccess, subjectExists } from '@/middleware/subject'
import { handleInputErrors } from '@/middleware/validation'
import { Router } from 'express'
import {
  readLimiter,
  writeLimiter,
  planningWriteLimiter,
  strictLimiter,
} from '@/config/limiter'
import { body, param } from 'express-validator'

const router: Router = Router()

router.use(authenticate)

router.param('subjectId', subjectExists)
router.param('subjectId', hasAccess)

router.post('/create/:subjectId', strictLimiter, PlanningController.create)
router.get('/', readLimiter, PlanningController.getAll)
router.get(
  '/:planningId/feedback',
  readLimiter,
  param('planningId')
    .isInt()
    .withMessage('El ID de la planeación debe ser un número válido'),
  handleInputErrors,
  PlanningController.getFeedback
)
router.get('/:planningId', readLimiter, PlanningController.getById)
router.put(
  '/:planningId/submit',
  planningWriteLimiter,
  param('planningId')
    .isInt()
    .withMessage('El ID de la planeación debe ser un número válido'),
  handleInputErrors,
  PlanningController.submit
)
router.delete(
  '/:planningId',
  writeLimiter,
  param('planningId')
    .isInt()
    .withMessage('El ID de la planeación debe ser un número válido'),
  body('password')
    .isString()
    .notEmpty()
    .withMessage('La contraseña es obligatoria'),
  handleInputErrors,
  ensureEditablePlanning,
  PlanningController.delete
)

router.post(
  '/:planningId/general-data',
  planningWriteLimiter,
  ensureEditablePlanning,
  GeneralDataController.createOrUpdate
)
router.put(
  '/:planningId/general-data',
  planningWriteLimiter,
  ensureEditablePlanning,
  GeneralDataController.createOrUpdate
)
router.get(
  '/:planningId/general-data',
  readLimiter,
  GeneralDataController.get
)

router.post(
  '/:planningId/transversal-axes',
  planningWriteLimiter,
  ensureEditablePlanning,
  TransversalAxisController.createOrUpdate
)
router.put(
  '/:planningId/transversal-axes',
  planningWriteLimiter,
  ensureEditablePlanning,
  TransversalAxisController.createOrUpdate
)
router.get(
  '/:planningId/transversal-axes',
  readLimiter,
  TransversalAxisController.get
)

router.post(
  '/:planningId/didactic-organization',
  planningWriteLimiter,
  ensureEditablePlanning,
  DidacticOrganizationController.createOrUpdate
)
router.put(
  '/:planningId/didactic-organization',
  planningWriteLimiter,
  ensureEditablePlanning,
  DidacticOrganizationController.createOrUpdate
)
router.get(
  '/:planningId/didactic-organization',
  readLimiter,
  DidacticOrganizationController.get
)

router.post(
  '/:planningId/thematic-units',
  planningWriteLimiter,
  ensureEditablePlanning,
  ThematicUnitController.create
)
router.get(
  '/:planningId/thematic-units',
  readLimiter,
  ThematicUnitController.getAll
)
router.get(
  '/:planningId/thematic-units/:id',
  readLimiter,
  ThematicUnitController.getById
)
router.put(
  '/:planningId/thematic-units/:id',
  planningWriteLimiter,
  ensureEditablePlanning,
  ThematicUnitController.update
)
router.delete(
  '/:planningId/thematic-units/:id',
  writeLimiter,
  ensureEditablePlanning,
  ThematicUnitController.delete
)
router.put(
  '/:planningId/thematic-units/reorder',
  planningWriteLimiter,
  ensureEditablePlanning,
  ThematicUnitController.reorder
)
router.get(
  '/:planningId/thematic-units/:unitId/sessions',
  readLimiter,
  ThematicUnitController.getSessionsByUnit
)

router.post(
  '/:planningId/thematic-units/:unitId/sessions',
  planningWriteLimiter,
  ensureEditablePlanning,
  ThematicUnitController.createSession
)
router.put(
  '/:planningId/thematic-units/:unitId/sessions/:sessionId',
  planningWriteLimiter,
  ensureEditablePlanning,
  ThematicUnitController.updateSession
)
router.delete(
  '/:planningId/thematic-units/:unitId/sessions/:sessionId',
  writeLimiter,
  ensureEditablePlanning,
  ThematicUnitController.deleteSession
)

router.post(
  '/:planningId/references',
  planningWriteLimiter,
  ensureEditablePlanning,
  ReferenceController.create
)
router.get(
  '/:planningId/references',
  readLimiter,
  ReferenceController.getAll
)
router.put(
  '/:planningId/references/sync',
  planningWriteLimiter,
  ensureEditablePlanning,
  ReferenceController.sync
)
router.put(
  '/:planningId/references/:id',
  planningWriteLimiter,
  ensureEditablePlanning,
  ReferenceController.update
)
router.delete(
  '/:planningId/references/:id',
  writeLimiter,
  ensureEditablePlanning,
  ReferenceController.delete
)

router.post(
  '/:planningId/plagiarism-tool',
  planningWriteLimiter,
  ensureEditablePlanning,
  PlagiarismToolController.createOrUpdate
)
router.put(
  '/:planningId/plagiarism-tool',
  planningWriteLimiter,
  ensureEditablePlanning,
  PlagiarismToolController.createOrUpdate
)
router.get(
  '/:planningId/plagiarism-tool',
  readLimiter,
  PlagiarismToolController.get
)

export default router
