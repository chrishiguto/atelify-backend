import { container } from 'tsyringe'

import { IProductRepository } from '@modules/product/infra/repository/IProductRepository'
import { ProductRepository } from '@modules/product/infra/repository/ProductRepository'

export type ICreateProduct = {
  name: string
  tenantId: string
}

export class CreateProductUseCase {
  private productRepository: IProductRepository

  constructor() {
    this.productRepository = container.resolve(ProductRepository)
  }

  async execute({ name, tenantId }: ICreateProduct) {
    const product = await this.productRepository.create({
      name,
      tenantId
    })

    return product
  }
}
