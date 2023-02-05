import { container } from 'tsyringe'

import { IProductRepository } from '@modules/product/infra/repository/IProductRepository'
import { ProductRepository } from '@modules/product/infra/repository/ProductRepository'

export class FindAllProductUseCase {
  private productRepository: IProductRepository

  constructor() {
    this.productRepository = container.resolve(ProductRepository)
  }

  async execute(tenantId: string) {
    const product = await this.productRepository.findAll(tenantId)

    return product
  }
}
