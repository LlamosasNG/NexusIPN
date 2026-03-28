import Subject from '@/models/Subject'
import UserSubject from '@/models/UserSubject'
import { NextFunction, Request, RequestParamHandler, Response } from 'express'

declare global {
  namespace Express {
    interface Request {
      subject?: Subject
      userSubject?: UserSubject
    }
  }
}

export const subjectExists: RequestParamHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
  subjectId
) => {
  try {
    const subject = await Subject.findByPk(subjectId)
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

export const hasAccess: RequestParamHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
  subjectId
) => {
  const userSubject = await UserSubject.findOne({
    where: { userId: req.user.id, subjectId },
  })
  if (!userSubject) {
    return res.status(403).json({ error: 'No tienes acceso a esta materia' })
  }
  req.userSubject = userSubject
  next()
}
