import { AuthEmail } from '@/emails/AuthEmail'
import Academy from '@/models/Academy'
import User from '@/models/User'
import { checkPassword, hashPassword } from '@/utils/auth'
import { generateJWT } from '@/utils/jwt'
import { generateToken } from '@/utils/token'
import { Request, Response } from 'express'

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { email, password, academyId } = req.body
    const userExist = await User.findOne({ where: { email } })
    if (userExist) {
      const error = new Error('Un usuario con este correo ya existe')
      return res.status(409).json({ error: error.message })
    }
    if (academyId) {
      const academyExists = await Academy.findByPk(academyId)
      if (!academyExists) {
        const error = new Error('La academia seleccionada no existe')
        return res.status(404).json({ error: error.message })
      }
    }
    try {
      const user = await User.create(req.body)
      user.token = generateToken()
      user.password = await hashPassword(password)
      await user.save()
      await AuthEmail.sendConfirmationEmail({
        name: user.name,
        email: user.email,
        token: user.token,
      })
      res.json(
        'Cuenta creada exitosamente, verifique su correo para confirmarla'
      )
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al crear la cuenta' })
    }
  }

  static confirmAccount = async (req: Request, res: Response) => {
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
  } 

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) {
      const error = new Error('Usuario no encontrado')
      return res.status(404).json({ error: error.message })
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
  }

  static requestConfirmationCode = async (req: Request, res: Response) => {
    const { email } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      const error = new Error('Usuario no encontrado')
      return res.status(404).json({ error: error.message })
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
  }

  static forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      const error = new Error('Usuario no encontrado')
      return res.status(404).json({ error: error.message })
    }
    user.token = generateToken()
    await user.save()
    await AuthEmail.sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: user.token,
    })
    res.json('Correo de restablecimiento de contraseña enviado')
  }

  static validateToken = async (req: Request, res: Response) => {
    const { token } = req.body
    const user = await User.findOne({ where: { token }})
    if (!user) {
      const error = new Error('Token no válido')
      return res.status(403).json({ error: error.message })
    }
    res.json('Token válido, puedes restablecer tu contraseña')
  }

  static resetPassword = async (req: Request, res: Response) => {
    const { token } = req.params
    const { password } = req.body
    const user = await User.findOne({ where: { token } })
    if (!user) {
      const error = new Error('Token no encontrado')
      return res.status(403).json({ error: error.message })
    }
    user.password = await hashPassword(password)
    user.token = null
    await user.save()
    res.json('Contraseña restablecida exitosamente')
  }

  static user = async (req: Request, res: Response) => {
    res.json(req.user)
  }
}
