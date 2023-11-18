import { container } from 'tsyringe'

import { IProductMaterialRepository } from '../../infra/repository/IProductMaterialRepository'
import { ProductMaterialRepository } from '../../infra/repository/ProductMaterialRepository'
import { IMaterialRepository } from '@app/modules/material/infra/repository/IMaterialRepository'
import { MaterialRepository } from '@app/modules/material/infra/repository/MaterialRepository'
import { HttpError } from '@app/utils/errors'

export type ICreateProductMaterial = {
  tenantId: string
  productId: string
  materialId: string
  quantity: number
}

export class CreateProductMaterialUseCase {
  private productMaterialRepository: IProductMaterialRepository
  private materialRepository: IMaterialRepository

  constructor() {
    this.productMaterialRepository = container.resolve(ProductMaterialRepository)
    this.materialRepository = container.resolve(MaterialRepository)
  }

  async execute({ tenantId, productId, materialId, quantity }: ICreateProductMaterial) {
    const material = await this.materialRepository.findById(materialId, tenantId)

    if (!material || material.quantity < quantity) {
      throw new HttpError(400, 'Material not found')
    }

    await this.materialRepository.update({
      id: materialId,
      quantity: material.quantity - quantity,
    })

    const product = await this.productMaterialRepository.create({
      tenantId,
      materialId,
      productId,
      quantity
    })

    return product
  }
}
