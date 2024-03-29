import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

import { ICreateStock } from '@modules/stock/useCases/createStock/CreateStockUseCase'
import { IStockRepository } from '@modules/stock/infra/repository/IStockRepository'

@injectable()
export class StockRepository implements IStockRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async findAll(tenantId: string) {
    const items = this.prisma.stock.findMany({
      where: {
        tenant_id: tenantId
      },
      include: {
        materials: true
      }
    })

    return items
  }

  async create({ name, tenantId }: ICreateStock) {
    const item = this.prisma.stock.create({
      data: {
        name,
        tenant_id: tenantId
      }
    })

    return item
  }
}
