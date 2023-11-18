import { PrismaClient } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

import { IUpdateProduct } from '@modules/product/useCases/updateProduct/UpdateProductUseCase'
import { IProductRepository } from '@modules/product/infra/repository/IProductRepository'
import { ICreateProduct } from '@modules/product/useCases/createProduct/CreateProductUseCase'
import { IFindProductById } from '@modules/product/useCases/findByIdProduct/FindByIdProductUseCase'

@injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @inject('PrismaClient') private prisma: PrismaClient
  ) {}

  async create({ name, tenantId }: ICreateProduct) {
    const product = this.prisma.product.create({
      data: {
        name,
        tenant_id: tenantId
      }
    })

    return product
  }

  async update({ id, tenantId, name, materials }: IUpdateProduct) {
    const product = this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
      }
    })

    return product
  }

  async findAll(tenantId: string) {
    const product = this.prisma.product.findMany({
      where: {
        tenant_id: tenantId
      },
      include: {
        productMaterial: {
          include: {
            material: true,
            product: true
          }
        }
      }
    })

    return product
  }

  async findById({ id, tenantId }: IFindProductById) {
    const product = this.prisma.product.findFirst({
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
        productMaterial: true
      }
    })

    if (!product) {
      throw new Error('Product not found')
    }

    return product
  }
}
