import { GeneralDataController } from '@/controllers/GeneralDataController'
import { PlagiarismToolController } from '@/controllers/PlagiarismToolController'
import { PlanningController } from '@/controllers/PlanningController'
import { ReferenceController } from '@/controllers/ReferenceController'
import { ThematicUnitController } from '@/controllers/ThematicUnitController'
import { TransversalAxisController } from '@/controllers/TransversalAxisController'
import { authenticate } from '@/middleware/auth'
import { hasAccess, subjectExists } from '@/middleware/subject'
import { Router } from 'express'

const router: Router = Router()

router.use(authenticate)

// --- Planning (padre) ---
router.param('subjectId', subjectExists)
router.param('subjectId', hasAccess)
router.post('/create/:subjectId', PlanningController.create)
router.get('/', PlanningController.getAll)
router.get('/:planningId', PlanningController.getById)

// --- Sección 1: Datos Generales ---
router.post('/:planningId/general-data', GeneralDataController.createOrUpdate)
router.put('/:planningId/general-data', GeneralDataController.createOrUpdate)
router.get('/:planningId/general-data', GeneralDataController.get)

// --- Sección 2: Ejes Transversales ---
router.post(
  '/:planningId/transversal-axes',
  TransversalAxisController.createOrUpdate
)
router.put(
  '/:planningId/transversal-axes',
  TransversalAxisController.createOrUpdate
)
router.get('/:planningId/transversal-axes', TransversalAxisController.get)

// --- Sección 3: Unidades Temáticas ---
router.post('/:planningId/thematic-units', ThematicUnitController.create)
router.get('/:planningId/thematic-units', ThematicUnitController.getAll)
router.get('/:planningId/thematic-units/:id', ThematicUnitController.getById)
router.put('/:planningId/thematic-units/:id', ThematicUnitController.update)
router.delete('/:planningId/thematic-units/:id', ThematicUnitController.delete)

// --- Sección 3 (hija): Sesiones ---
router.post(
  '/:planningId/thematic-units/:unitId/sessions',
  ThematicUnitController.createSession
)
router.put(
  '/:planningId/thematic-units/:unitId/sessions/:sessionId',
  ThematicUnitController.updateSession
)
router.delete(
  '/:planningId/thematic-units/:unitId/sessions/:sessionId',
  ThematicUnitController.deleteSession
)

// --- Sección 4: Referencias ---
router.post('/:planningId/references', ReferenceController.create)
router.get('/:planningId/references', ReferenceController.getAll)
router.put('/:planningId/references/:id', ReferenceController.update)
router.delete('/:planningId/references/:id', ReferenceController.delete)

// --- Sección 5: Herramienta de Plagio ---
router.post(
  '/:planningId/plagiarism-tool',
  PlagiarismToolController.createOrUpdate
)
router.put(
  '/:planningId/plagiarism-tool',
  PlagiarismToolController.createOrUpdate
)
router.get('/:planningId/plagiarism-tool', PlagiarismToolController.get)

export default router
