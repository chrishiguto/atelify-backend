import { PrismaClient } from '@prisma/client'
import { container } from 'tsyringe'
import { prisma } from '../../database/prismaClient'

container.register<PrismaClient>('PrismaClient', {
  useValue: prisma
})
