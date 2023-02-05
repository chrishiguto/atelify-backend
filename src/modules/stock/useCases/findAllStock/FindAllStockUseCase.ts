import { container } from 'tsyringe'

import { IStockRepository } from '@modules/stock/infra/repository/IStockRepository'
import { StockRepository } from '@modules/stock/infra/repository/StockRepository'

export class FindAllStockUseCase {
  private stockRepository: IStockRepository

  constructor() {
    this.stockRepository = container.resolve(StockRepository)
  }

  async execute(tenantId: string) {
    const items = await this.stockRepository.findAll(tenantId)

    return items
  }
}
