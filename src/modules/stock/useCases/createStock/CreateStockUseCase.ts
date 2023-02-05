import { container } from 'tsyringe'

import { IStockRepository } from '@modules/stock/infra/repository/IStockRepository'
import { StockRepository } from '@modules/stock/infra/repository/StockRepository'

export interface ICreateStock {
  name: string
  tenantId: string
}

export class CreateStockUseCase {
  private stockRepository: IStockRepository

  constructor() {
    this.stockRepository = container.resolve(StockRepository)
  }

  async execute({ name, tenantId }: ICreateStock) {
    const item = await this.stockRepository.create({
      name,
      tenantId
    })

    return item
  }
}
