import GeneralData from '@/models/GeneralData'
import Planning from '@/models/Planning'
import { Request, Response } from 'express'

export class GeneralDataController {
  static createOrUpdate = async (req: Request, res: Response) => {
    try {
      const { planningId } = req.params

      // Verificar que la planeación exista y pertenezca al usuario
      const planning = await Planning.findOne({
        where: { id: planningId, userId: req.user.id },
      })

      if (!planning) {
        return res
          .status(404)
          .json({ error: 'Planeación no encontrada' })
      }

      // Buscar si ya existen datos generales para esta planeación
      const existing = await GeneralData.findOne({
        where: { planningId },
      })

      if (existing) {
        // Actualizar
        await existing.update(req.body)
        return res.json({ message: 'Datos generales actualizados', data: existing })
      }

      // Crear
      const generalData = await GeneralData.create({
        planningId: Number(planningId),
        ...req.body,
      })

      res.status(201).json({ message: 'Datos generales guardados', data: generalData })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error al guardar los datos generales' })
    }
  }

  static get = async (req: Request, res: Response) => {
    try {
      const { planningId } = req.params

      const generalData = await GeneralData.findOne({
        where: { planningId },
      })

      if (!generalData) {
        return res
          .status(404)
          .json({ error: 'Datos generales no encontrados' })
      }

      res.json(generalData)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error al obtener los datos generales' })
    }
  }
}
