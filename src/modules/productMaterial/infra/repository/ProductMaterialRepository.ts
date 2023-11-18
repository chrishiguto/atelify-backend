import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

import { IProductMaterialRepository } from './IProductMaterialRepository'
import { ICreateProductMaterial } from '../../useCases/createProductMaterial/CreateProductMaterialUseCase'

@injectable()
export class ProductMaterialRepository implements IProductMaterialRepository {
  constructor(
    @inject('PrismaClient') private prisma: PrismaClient
  ) {}

  async create({ tenantId, materialId, productId, quantity }: ICreateProductMaterial) {
    const product = this.prisma.productMaterial.create({
      data: {
        tenant_id: tenantId,
        materialId,
        productId,
        quantity,
      }
    })

    return product
  }
}
