import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { container } from 'tsyringe'
import { HttpError } from '../../../../utils/errors'

import { IUserRepository } from '../../infra/repository/IUserRepository'
import { UserRepository } from '../../infra/repository/UserRepository'

export interface ISignInUser {
  email: string
  password: string
}

export class SignInUserUseCase {
  private userRepository: IUserRepository

  constructor() {
    this.userRepository = container.resolve(UserRepository)
  }

  async execute({ email, password }: ISignInUser) {
    if (!email || !password) {
      throw new HttpError(422, 'Email or password is missing.')
    }

    const user = await this.userRepository.findFirst(email)

    if (!user) {
      throw new HttpError(401, 'The username or password is incorrect.')
    }
    const isAuthenticated = bcrypt.compare(password, user.password)

    if (!isAuthenticated) {
      throw new HttpError(401, 'The username or password is incorrect.')
    }

    const token = jwt.sign(
      {
        email,
        sub: user.id
      },
      'f5d8d8d37c319367aba22471e5b9644b713b3a6166928e3e13941ad5856e66af'
    )

    return token
  }
}
