import { AuthEmail } from '@/emails/AuthEmail'
import Academy from '@/models/Academy'
import Subject from '@/models/Subject'
import User from '@/models/User'
import { checkPassword, hashPassword } from '@/utils/auth'
import { generateJWT } from '@/utils/jwt'
import { generateToken } from '@/utils/token'
import { Request, Response } from 'express'

export class AuthController {
  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body
      const user = await User.findOne({ where: { token } })
      if (!user) {
        const error = new Error('Token no encontrado')
        return res.status(401).json({ error: error.message })
      }
      user.token = null
      user.confirmed = true
      await user.save()
      res.json('Cuenta confirmada exitosamente')
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al confirmar la cuenta' })
    }
  }

  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ where: { email } })
      if (!user) {
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({ error: error.message })
      }
      if (user.isActive === false) {
        return res.status(403).json({ error: 'La cuenta está desactivada' })
      }
      if (!user.confirmed) {
        user.token = generateToken()
        await user.save()
        await AuthEmail.sendConfirmationEmail({
          name: user.name,
          email: user.email,
          token: user.token,
        })
        const error = new Error(
          'La cuenta no ha sido confirmada, se ha enviado un correo para confirmarla'
        )
        return res.status(401).json({ error: error.message })
      }
      const isPasswordValid = await checkPassword(password, user.password)
      if (!isPasswordValid) {
        const error = new Error('Contraseña incorrecta')
        return res.status(403).json({ error: error.message })
      }
      const token = generateJWT(user.id)
      res.json(token)
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al iniciar sesión' })
    }
  }

  static requestConfirmationCode = async (req: Request, res: Response) => {
    try {
      const { email } = req.body
      const user = await User.findOne({ where: { email } })
      if (!user) {
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({ error: error.message })
      }
      if (user.isActive === false) {
        return res.status(403).json({ error: 'La cuenta está desactivada' })
      }
      if (user.confirmed) {
        const error = new Error('La cuenta ya ha sido confirmada')
        return res.status(401).json({ error: error.message })
      }
      user.token = generateToken()
      await user.save()
      await AuthEmail.sendConfirmationEmail({
        name: user.name,
        email: user.email,
        token: user.token,
      })
      res.json('Correo de confirmación de cuenta enviado')
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Hubo un error al enviar el correo de confirmación' })
    }
  }

  static forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body
      const user = await User.findOne({ where: { email } })
      if (!user) {
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({ error: error.message })
      }
      if (user.isActive === false) {
        return res.status(403).json({ error: 'La cuenta está desactivada' })
      }
      user.token = generateToken()
      await user.save()
      await AuthEmail.sendResetPasswordEmail({
        name: user.name,
        email: user.email,
        token: user.token,
      })
      res.json('Correo de restablecimiento de contraseña enviado')
    } catch (error) {
      res.status(500).json({
        error:
          'Hubo un error al enviar el correo de restablecimiento de contraseña',
      })
    }
  }

  static validateToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.body
      const user = await User.findOne({ where: { token } })
      if (!user) {
        const error = new Error('Token no válido')
        return res.status(403).json({ error: error.message })
      }
      if (user.isActive === false) {
        return res.status(403).json({ error: 'La cuenta está desactivada' })
      }
      res.json('Token válido, puedes restablecer tu contraseña')
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al validar el token' })
    }
  }

  static resetPassword = async (req: Request, res: Response) => {
    const { token } = req.params
    const { password } = req.body
    const user = await User.findOne({ where: { token } })
    if (!user) {
      const error = new Error('Token no encontrado')
      return res.status(403).json({ error: error.message })
    }
    if (user.isActive === false) {
      return res.status(403).json({ error: 'La cuenta está desactivada' })
    }
    user.password = await hashPassword(password)
    user.token = null
    user.mustChangePassword = false
    user.passwordChangedAt = new Date()
    await user.save()
    res.json('Contraseña restablecida exitosamente')
  }

  static changeInitialPassword = async (req: Request, res: Response) => {
    try {
      const { currentPassword, password } = req.body
      const user = await User.findByPk(req.user.id)

      if (!user) {
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({ error: error.message })
      }

      const isPasswordValid = await checkPassword(currentPassword, user.password)
      if (!isPasswordValid) {
        const error = new Error('La contraseña actual es incorrecta')
        return res.status(403).json({ error: error.message })
      }

      if (currentPassword === password) {
        const error = new Error(
          'La nueva contraseña debe ser diferente a la actual'
        )
        return res.status(400).json({ error: error.message })
      }

      user.password = await hashPassword(password)
      user.mustChangePassword = false
      user.passwordChangedAt = new Date()
      await user.save()

      res.json('Contraseña actualizada exitosamente')
    } catch (error) {
      res.status(500).json({
        error: 'Hubo un error al actualizar la contraseña',
      })
    }
  }

  static user = async (req: Request, res: Response) => {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: [
          'id',
          'name',
          'email',
          'role',
          'isActive',
          'mustChangePassword',
        ],
        include: [
          {
            model: Academy,
            attributes: ['id', 'name', 'description'],
          },
          {
            model: Subject,
            attributes: ['id', 'name'],
            through: { attributes: ['period', 'active'] },
          },
        ],
      })
      res.json(user)
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al obtener el usuario' })
    }
  }
}
