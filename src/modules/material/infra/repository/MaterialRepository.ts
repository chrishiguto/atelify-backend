import { PrismaClient } from '@prisma/client'
import { injectable, inject } from 'tsyringe'

import { ICreateMaterial } from '@modules/material/useCases/createMaterial/CreateMaterialUseCase'
import { IUpdateMaterial } from '@modules/material/useCases/updateMaterial/UpdateMaterialUseCase'
import { IMaterialRepository } from '@modules/material/infra/repository/IMaterialRepository'
import { IDeleteMaterial } from '@modules/material/useCases/deleteMaterial/DeleteMaterialUseCase'
import { HttpError } from '@utils/errors'

@injectable()
export class MaterialRepository implements IMaterialRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async update({ id, uom, quantity, cost, stockId }: IUpdateMaterial) {
    const material = await this.prisma.material.findUnique({
      where: {
        id
      }
    })

    if (!material) {
      throw new HttpError(400, 'Material not found')
    }

    const updatedMaterial = await this.prisma.material.update({
      where: {
        id
      },
      data: {
        uom,
        quantity,
        cost,
        ...(stockId && { 
          Stock: {
            connect: {
              id: stockId
            }
          }
        })
      }
    })

    return updatedMaterial
  }

  async findById(id: string) {
    const material = await this.prisma.material.findUnique(({
      where: {
        id
      }
    }))

    return material
  }

  async findAll(tenantId: string) {
    const materials = await this.prisma.material.findMany({
      where: {
        tenant_id: tenantId
      },
      include: {
        productMaterial: true
      }
    })

    return materials
  }

  async delete({ id, tenantId }: IDeleteMaterial) {
    const material = await this.prisma.material.findFirst({
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
      }
    })

    if (!material) {
      throw new Error('Material not found')
    }

    await this.prisma.material.delete({
      where: {
        id
      }
    })

    return material
  }

  async create({ tenantId, uom, quantity, cost }: ICreateMaterial) {
    const material = await this.prisma.material.create({
      data: {
        tenant_id: tenantId,
        uom,
        quantity,
        cost
      }
    })

    return material
  }
}
