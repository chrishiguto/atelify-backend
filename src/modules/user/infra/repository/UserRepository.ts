import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

import { ICreateUser } from '@modules/user/useCases/createUser/CreateUserUseCase'
import { IUserRepository } from '@modules/user/infra/repository/IUserRepository'

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject('PrismaClient') private repository: PrismaClient) {}

  async create({ email, password }: ICreateUser) {
    const user = await this.repository.user.create({
      data: {
        email,
        password
      }
    })

    return user
  }

  async findFirst(email: string) {
    const user = await this.repository.user.findUnique({
      where: {
        email
      }
    })

    return user
  }
}
