import Academy from '@/models/Academy'
import User from '@/models/User'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization
  if (!bearer || !bearer.startsWith('Bearer ')) {
    const error = new Error('No autorizado')
    return res.status(401).json({ error: error.message })
  }
  const token = bearer.split(' ')[1]
  if (!token) {
    const error = new Error('No autorizado')
    return res.status(401).json({ error: error.message })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (typeof decoded === 'object' && decoded.id) {
      req.user = await User.findByPk(decoded.id, {
        attributes: [
          'id',
          'name',
          'email',
          'role',
          'academyId',
          'isActive',
          'mustChangePassword',
        ],
        include: [{ model: Academy, attributes: ['id', 'name'] }],
      })
      if (!req.user) {
        return res.status(401).json({ error: 'No autorizado' })
      }
      if (req.user.isActive === false) {
        return res.status(403).json({ error: 'La cuenta está desactivada' })
      }
    }
    next()
  } catch (error) {
    res.status(500).json({ error: 'Token inválido' })
  }
}
