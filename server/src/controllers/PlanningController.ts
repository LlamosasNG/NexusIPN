import GeneralData from '@/models/GeneralData'
import PlagiarismTool from '@/models/PlagiarismTool'
import Planning, { PlanningStatus } from '@/models/Planning'
import Reference from '@/models/Reference'
import SessionActivity from '@/models/SessionActivity'
import ThematicUnit from '@/models/ThematicUnit'
import TransversalAxis from '@/models/TransversalAxis'
import { Request, Response } from 'express'

export class PlanningController {
  static create = async (req: Request, res: Response) => {
    try {
      const userId = req.user.id
      const subjectId = req.params.subjectId

      const planning = await Planning.findOne({
        where: { userId, subjectId },
      })

      if (planning) {
        return res.status(400).json({ error: 'Ya tienes una planeación para esta materia' })
      }

      await Planning.create({
        userId,
        subjectId,
        period: req.userSubject.period,
        status: PlanningStatus.DRAFT,
      })

      res.status(201).json('Planeación creada correctamente')
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Hubo un error al crear la planeación' })
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

  static getById = async (req: Request, res: Response) => {
    try {
      const { planningId } = req.params

      const planning = await Planning.findOne({
        where: { id: planningId, userId: req.user.id },
        include: [
          GeneralData,
          TransversalAxis,
          {
            model: ThematicUnit,
            include: [SessionActivity],
          },
          Reference,
          PlagiarismTool,
        ],
      })

      if (!planning) {
        return res.status(404).json({ error: 'Planeación no encontrada' })
      }

      res.json(planning)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Hubo un error al obtener la planeación' })
    }
  }
}
