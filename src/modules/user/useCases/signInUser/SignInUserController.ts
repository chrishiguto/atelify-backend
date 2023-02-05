import { NextFunction, Request, Response } from 'express'
import { SignInUserUseCase } from './SignInUserUseCase'

export class SignInUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body

      const signInUserUseCase = new SignInUserUseCase()

      const token = await signInUserUseCase.execute({
        email,
        password
      })

      return res.json(token)
    } catch (err) {
      next(err)
    }
  }
}
