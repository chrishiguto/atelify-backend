import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

import { ICreateUser } from '@modules/user/useCases/createUser/CreateUserUseCase'
import { IUserRepository } from '@modules/user/infra/repository/IUserRepository'

@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async create({ email, password }: ICreateUser) {
    const user = await this.prisma.user.create({
      data: {
        email,
        password
      }
    })

    return user
  }

  async findFirst(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }
}
