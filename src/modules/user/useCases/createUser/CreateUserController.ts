import { NextFunction, Request, Response } from 'express'

import { CreateUserUseCase } from '@modules/user/useCases/createUser/CreateUserUseCase'

export class CreateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body

      const createUserUseCase = new CreateUserUseCase()

      const user = await createUserUseCase.execute({
        email,
        password
      })

      return res.json(user)
    } catch (err) {
      next(err)
    }
  }
}
