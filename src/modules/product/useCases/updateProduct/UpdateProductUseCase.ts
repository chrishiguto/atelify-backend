import { container } from 'tsyringe'
import { IProductRepository } from '../../infra/repository/IProductRepository'
import { ProductRepository } from '../../infra/repository/ProductRepository'

export interface IUpdateProduct {
  id: string
  tenantId: string
  name?: string
  materials?: string[]
}

export class UpdateProductUseCase {
  private productRepository: IProductRepository

  constructor() {
    this.productRepository = container.resolve(ProductRepository)
  }

  async execute({ id, tenantId, name, materials }: IUpdateProduct) {
    const product = await this.productRepository.update({
      id,
      tenantId,
      name,
      materials
    })

    return product
  }
}
