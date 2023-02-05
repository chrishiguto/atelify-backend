import bcrypt from 'bcryptjs'
import { container } from 'tsyringe'

import { IUserRepository } from '@modules/user/infra/repository/IUserRepository'
import { UserRepository } from '@modules/user/infra/repository/UserRepository'
import { HttpError } from '@utils/errors'

export interface ICreateUser {
  email: string
  password: string
}

export class CreateUserUseCase {
  private userRepository: IUserRepository

  constructor() {
    this.userRepository = container.resolve(UserRepository)
  }

  async execute({ email, password }: ICreateUser) {
    if (!email || !password) {
      throw new HttpError(422, 'Please provider email and/or password.')
    }

    const user = await this.userRepository.findFirst(email)

    if (user) {
      throw new HttpError(400, 'User already exists.')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await this.userRepository.create({
      email,
      password: hashedPassword
    })

    const { password: removedPassword, ...restNewUser } = newUser

    return restNewUser
  }
}
