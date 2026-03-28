import Planning from '@/models/Planning'
import TransversalAxis from '@/models/TransversalAxis'
import { Request, Response } from 'express'

export class TransversalAxisController {
  static createOrUpdate = async (req: Request, res: Response) => {
    try {
      const { planningId } = req.params

      const planning = await Planning.findOne({
        where: { id: planningId, userId: req.user.id },
      })

      if (!planning) {
        return res
          .status(404)
          .json({ error: 'Planeación no encontrada' })
      }

      const existing = await TransversalAxis.findOne({
        where: { planningId },
      })

      if (existing) {
        await existing.update(req.body)
        return res.json({ message: 'Ejes transversales actualizados', data: existing })
      }

      const transversalAxis = await TransversalAxis.create({
        planningId: Number(planningId),
        ...req.body,
      })

      res.status(201).json({ message: 'Ejes transversales guardados', data: transversalAxis })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error al guardar los ejes transversales' })
    }
  }

  static get = async (req: Request, res: Response) => {
    try {
      const { planningId } = req.params

      const transversalAxis = await TransversalAxis.findOne({
        where: { planningId },
      })

      if (!transversalAxis) {
        return res
          .status(404)
          .json({ error: 'Ejes transversales no encontrados' })
      }

      res.json(transversalAxis)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error al obtener los ejes transversales' })
    }
  }
}
