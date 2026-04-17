import Planning, { PlanningStatus } from '@/models/Planning'
import Subject from '@/models/Subject'
import { Request, Response } from 'express'

export class PlanningController {
  static create = async (req: Request, res: Response) => {
    try {
      const userId = req.user.id
      const subjectId = req.params.subjectId

      const existingPlanning = await Planning.findOne({
        where: { userId, subjectId },
      })

      if (existingPlanning) {
        return res
          .status(400)
          .json({ error: 'Ya tienes una planeación para esta materia' })
      }

      const subject = await Subject.findByPk(Number(subjectId), {
        include: ['academy', 'studyPlans'],
      })

      if (!subject) {
        return res.status(404).json({ error: 'Materia no encontrada' })
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
        include: [
          {
            model: Subject,
            attributes: ['id', 'name', 'code'],
          },
        ],
        order: [['updatedAt', 'DESC']],
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
        include: [Subject],
        order: [['updatedAt', 'DESC']],
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
