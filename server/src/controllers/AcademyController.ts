import Academy from '@/models/Academy'
import { Request, Response } from 'express'

export class AcademyController {
  static getAcademies = async (req: Request, res: Response) => {
    try {
      const academies = await Academy.findAll({
        attributes: ['id', 'name', 'description'],
        order: [['createdAt', 'DESC']],
      })
      res.json(academies)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las academias' })
    }
  }
}
