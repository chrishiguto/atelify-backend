import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

import { IUpdateProduct } from '@modules/product/useCases/updateProduct/UpdateProductUseCase'
import { IProductRepository } from '@modules/product/infra/repository/IProductRepository'
import { ICreateProduct } from '@modules/product/useCases/createProduct/CreateProductUseCase'
import { IFindProductById } from '@modules/product/useCases/findByIdProduct/FindByIdProductUseCase'

@injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @inject('PrismaClient') private productRepository: PrismaClient
  ) {}

  async create({ name, tenantId }: ICreateProduct) {
    const product = this.productRepository.product.create({
      data: {
        name,
        tenant_id: tenantId
      }
    })

    return product
  }

  async update({ id, tenantId, name, materials }: IUpdateProduct) {
    if (!materials?.length) {
      return null
    }

    const normalizedMaterials = materials.map((materialId) => ({
      id: materialId
    }))

    const product = this.productRepository.product.update({
      where: {
        id
      },
      data: {
        name,
        materials: {
          connect: normalizedMaterials
        }
      }
    })

    return product
  }

  async findAll(tenantId: string) {
    const product = this.productRepository.product.findMany({
      where: {
        tenant_id: tenantId
      },
      include: {
        materials: true
      }
    })

    return product
  }

  async findById({ id, tenantId }: IFindProductById) {
    const product = this.productRepository.product.findFirst({
      where: {
        AND: [
          {
            id: {
              contains: id
            }
          },
          {
            tenant_id: {
              contains: tenantId
            }
          }
        ]
      },
      include: {
        materials: true
      }
    })

    if (!product) {
      throw new Error('Product not found')
    }

    return product
  }
}
