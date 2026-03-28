import PlagiarismTool from '@/models/PlagiarismTool'
import Planning from '@/models/Planning'
import { Request, Response } from 'express'

export class PlagiarismToolController {
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

      const existing = await PlagiarismTool.findOne({
        where: { planningId },
      })

      if (existing) {
        await existing.update(req.body)
        return res.json({
          message: 'Herramienta de plagio actualizada',
          data: existing,
        })
      }

      const plagiarismTool = await PlagiarismTool.create({
        planningId: Number(planningId),
        ...req.body,
      })

      res.status(201).json({
        message: 'Herramienta de plagio guardada',
        data: plagiarismTool,
      })
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ error: 'Error al guardar la herramienta de plagio' })
    }
  }

  static get = async (req: Request, res: Response) => {
    try {
      const { planningId } = req.params

      const plagiarismTool = await PlagiarismTool.findOne({
        where: { planningId },
      })

      if (!plagiarismTool) {
        return res
          .status(404)
          .json({ error: 'Herramienta de plagio no encontrada' })
      }

      res.json(plagiarismTool)
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ error: 'Error al obtener la herramienta de plagio' })
    }
  }
}
