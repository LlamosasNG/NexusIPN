import Planning from '@/models/Planning'
import Reference from '@/models/Reference'
import { Request, Response } from 'express'

export class ReferenceController {
  static create = async (req: Request, res: Response) => {
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

      const reference = await Reference.create({
        planningId: Number(planningId),
        ...req.body,
      })

      res.status(201).json({ message: 'Referencia creada', data: reference })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error al crear la referencia' })
    }
  }

  static getAll = async (req: Request, res: Response) => {
    try {
      const { planningId } = req.params

      const references = await Reference.findAll({
        where: { planningId },
      })

      res.json(references)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error al obtener las referencias' })
    }
  }

  static update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)

      const reference = await Reference.findByPk(id)

      if (!reference) {
        return res
          .status(404)
          .json({ error: 'Referencia no encontrada' })
      }

      await reference.update(req.body)
      res.json({ message: 'Referencia actualizada', data: reference })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error al actualizar la referencia' })
    }
  }

  static delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)

      const reference = await Reference.findByPk(id)

      if (!reference) {
        return res
          .status(404)
          .json({ error: 'Referencia no encontrada' })
      }

      await reference.destroy()
      res.json({ message: 'Referencia eliminada' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error al eliminar la referencia' })
    }
  }
}
