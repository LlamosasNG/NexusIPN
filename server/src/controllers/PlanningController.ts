import { PlanningContent } from '@/interfaces/PlanningInterfaces'
import Planning from '@/models/Planning'
import { Request, Response } from 'express'

export class PlanningController {
  static create = async (req: Request, res: Response) => {
    try {
      const userId = req.user.id
      const subjectId = req.params.subjectId

      // Forzamos el tipado del body
      const planningData: PlanningContent = req.body.content

      // VALIDACIÓN SIMPLE (Gracias a la interfaz puedes acceder a las propiedades)
      // Si intentas acceder a "planningData.patito", TypeScript te marcará error antes de compilar.
      if (!planningData.units || planningData.units.length === 0) {
        const error = new Error(
          'La planeación debe tener al menos una unidad temática'
        )
        return res.status(400).json({ error: error.message })
      }

      // Guardar en BD
      await Planning.create({
        userId,
        subjectId,
        ...req.body, // Asegúrate de filtrar lo que no quieres
        content: planningData, // Se guarda como JSON automáticamente
      })

      res.status(201).json('Planeación guardada correctamente')
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Hubo un error al guardar' })
    }
  }

  static getAll = async (req: Request, res: Response) => {
    try {
      const plannings = await Planning.findAll({
        where: { userId: req.user.id },
      })
      res.json(plannings)
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ error: 'Hubo un error al obtener las planeaciones' })
    }
  }
}
