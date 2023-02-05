import { User } from '@prisma/client'

import { ICreateUser } from '@modules/user/useCases/createUser/CreateUserUseCase'

export interface IUserRepository {
  create(args: ICreateUser): Promise<User>
  findFirst(email: string): Promise<User | null>
}
