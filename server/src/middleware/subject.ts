import Subject from '@/models/Subject'
import { NextFunction, Request, Response } from 'express'

declare global {
  namespace Express {
    interface Request {
      subject?: Subject
    }
  }
}

export const subjectExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subject = await Subject.findByPk(req.params.subjectId)
    if (!subject) {
      return res.status(404).json({ error: 'Materia no encontrada' })
    }
    req.subject = subject
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Hubo un error' })
  }
}
