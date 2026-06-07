import Planning, { PlanningStatus } from '@/models/Planning'
import { NextFunction, Request, Response } from 'express'

const LOCKED_PLANNING_STATUSES = [
  PlanningStatus.SENT,
  PlanningStatus.APPROVED,
]

export const ensureEditablePlanning = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const planningId = Number(req.params.planningId)

    if (!Number.isInteger(planningId) || planningId < 1) {
      return res
        .status(400)
        .json({ error: 'El ID de la planificación debe ser un número válido' })
    }

    const planning = await Planning.findOne({
      where: { id: planningId, userId: req.user.id },
      attributes: ['id', 'status'],
    })

    if (!planning) {
      return res.status(404).json({ error: 'Planificación no encontrada' })
    }

    if (LOCKED_PLANNING_STATUSES.includes(planning.status)) {
      return res.status(409).json({
        error:
          'No puedes modificar una planificación enviada o aprobada',
      })
    }

    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al validar la planificación' })
  }
}
