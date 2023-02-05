import { PrismaClient } from '@prisma/client'
import { injectable, inject } from 'tsyringe'

import { ICreateMaterial } from '@modules/material/useCases/createMaterial/CreateMaterialUseCase'
import { IUpdateMaterial } from '@modules/material/useCases/updateMaterial/UpdateMaterialUseCase'
import { IMaterialRepository } from '@modules/material/infra/repository/IMaterialRepository'
import { IDeleteMaterial } from '@modules/material/useCases/deleteMaterial/DeleteMaterialUseCase'
import { HttpError } from '@utils/errors'

@injectable()
export class MaterialRepository implements IMaterialRepository {
  constructor(@inject('PrismaClient') private repository: PrismaClient) {}

  async update({ id, uom, quantity, cost }: IUpdateMaterial) {
    const material = await this.repository.material.findUnique({
      where: {
        id
      }
    })

    if (!material) {
      throw new HttpError(400, 'Material not found')
    }

    const updatedMaterial = await this.repository.material.update({
      where: {
        id
      },
      data: {
        uom,
        quantity,
        cost
      }
    })

    return updatedMaterial
  }

  async findById(id: string) {
    const material = await this.repository.material.findUnique(({
      where: {
        id
      }
    }))

    return material
  }

  async findAll(tenantId: string) {
    const materials = await this.repository.material.findMany({
      where: {
        tenant_id: tenantId
      }
    })

    return materials
  }

  async delete({ id, tenantId }: IDeleteMaterial) {
    const material = await this.repository.material.findFirst({
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

    await this.repository.material.delete({
      where: {
        id
      }
    })

    return material
  }

  async create({ tenantId, uom, quantity, cost }: ICreateMaterial) {
    const material = await this.repository.material.create({
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
