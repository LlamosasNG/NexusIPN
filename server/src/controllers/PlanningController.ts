import GeneralData from '@/models/GeneralData'
import PlagiarismTool from '@/models/PlagiarismTool'
import Planning, { PlanningStatus } from '@/models/Planning'
import Reference from '@/models/Reference'
import SessionActivity from '@/models/SessionActivity'
import Subject from '@/models/Subject'
import ThematicUnit from '@/models/ThematicUnit'
import TransversalAxis from '@/models/TransversalAxis'
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

      const planning = await Planning.create({
        userId,
        subjectId,
        period: req.userSubject.period,
        status: PlanningStatus.DRAFT,
      })

      const programName = subject.studyPlans && subject.studyPlans.length > 0
        ? subject.studyPlans[0].name
        : subject.studyPlanNames && subject.studyPlanNames.length > 0
          ? subject.studyPlanNames[0]
          : 'Plan de estudios'

      await GeneralData.create({
        planningId: planning.id,
        academicUnit: subject.academicUnit,
        program: programName,
        learningUnit: subject.name,
        semester: subject.semester,
        areaFormation: subject.areaFormation,
        modality: subject.modality,
        unitType: subject.type || [],
        creditsTepic: subject.creditsTepic,
        creditsSatca: subject.creditsTepic * 0.8421,
        academy: subject.academy?.name || 'Academia',
        weeksPerSemester: subject.weeksPerSemester,
        sessionsPerSemester: {
          classroom: subject.hoursPerSemester?.classroom || 0,
          laboratory: subject.hoursPerSemester?.laboratory || 0,
          clinic: subject.hoursPerSemester?.clinic || 0,
          other: subject.hoursPerSemester?.other || 0,
          total: (subject.hoursPerSemester?.classroom || 0) +
            (subject.hoursPerSemester?.laboratory || 0) +
            (subject.hoursPerSemester?.clinic || 0) +
            (subject.hoursPerSemester?.other || 0),
        },
        hoursPerSemester: subject.hoursPerSemester || {
          theory: 0,
          practice: 0,
          total1: 0,
          classroom: 0,
          laboratory: 0,
          clinic: 0,
          other: 0,
          total2: 0,
        },
        schoolPeriod: req.userSubject.period,
        groups: [],
        teacherName: req.user.name,
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
        include: [Subject],
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
        include: [
          GeneralData,
          Subject,
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
