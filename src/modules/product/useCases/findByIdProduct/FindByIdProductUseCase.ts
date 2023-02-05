import { container } from 'tsyringe'

import { IProductRepository } from '@modules/product/infra/repository/IProductRepository'
import { ProductRepository } from '@modules/product/infra/repository/ProductRepository'

export type IFindProductById = {
  id: string
  tenantId: string
}

export class FindByIdProductUseCase {
  private productRepository: IProductRepository

  constructor() {
    this.productRepository = container.resolve(ProductRepository)
  }

  async execute({ id, tenantId }: IFindProductById) {
    const product = await this.productRepository.findById({
      id,
      tenantId
    })

    return product
  }
}
