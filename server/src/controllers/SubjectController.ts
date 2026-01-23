import Academy from '@/models/Academy'
import Subject from '@/models/Subject'
import UserSubject from '@/models/UserSubject'
import { Request, Response } from 'express'

export class SubjectController {
  static getSubjectsByAcademy = async (req: Request, res: Response) => {
    try {
      const { academyId } = req.params
      const subjects = await Subject.findAll({
        where: { academyId },
        include: [
          {
            model: Academy,
            attributes: ['id', 'name'],
          },
        ],
        order: [['name', 'ASC']],
      })
      res.json(subjects)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las materias' })
    }
  }

  static assignSubjects = async (req: Request, res: Response) => {
    try {
      const { subjectIds, period } = req.body
      const userId = req.user.id

      // Validar que no se excedan 5 materias
      if (subjectIds.length > 5) {
        const error = new Error('No puedes asignar más de 5 materias')
        return res.status(400).json({ error: error.message })
      }

      // Verificar que todas las materias existan
      const subjects = await Subject.findAll({
        where: {
          id: subjectIds,
        },
      })

      if (subjects.length !== subjectIds.length) {
        const error = new Error('Una o más materias no existen')
        return res.status(404).json({ error: error.message })
      }

      // Eliminar asignaciones anteriores del usuario
      await UserSubject.destroy({
        where: { userId },
      })

      // Crear nuevas asignaciones
      const assignments = subjectIds.map((subjectId: number) => ({
        userId,
        subjectId,
        period: period || new Date().getFullYear().toString(),
        active: true,
      }))

      await UserSubject.bulkCreate(assignments)

      res.json({ message: 'Materias asignadas exitosamente' })
    } catch (error) {
      res.status(500).json({ error: 'Error al asignar las materias' })
    }
  }

  static removeSubject = async (req: Request, res: Response) => {
    try {
      const { subjectId } = req.params
      const userId = req.user.id

      const deleted = await UserSubject.destroy({
        where: {
          userId,
          subjectId,
        },
      })
      if (deleted === 0) {
        const error = new Error('No tienes asignada esta materia')
        return res.status(404).json({ error: error.message })
      }
      res.json({ message: 'Materia removida exitosamente' })
    } catch (error) {
      res.status(500).json({ error: 'Error al remover la materia' })
    }
  }
}
