import { UoM } from '@prisma/client'
import { container } from 'tsyringe'

import { IMaterialRepository } from '@modules/material/infra/repository/IMaterialRepository'
import { MaterialRepository } from '@modules/material/infra/repository/MaterialRepository'

export interface ICreateMaterial {
  tenantId: string
  uom: UoM
  quantity: number
  cost: number
  stockId?: string
}

export class CreateMaterialUseCase {
  private materialRepository: IMaterialRepository

  constructor() {
    this.materialRepository = container.resolve(MaterialRepository)
  }

  async execute({ tenantId, uom, quantity, cost, stockId }: ICreateMaterial) {
    const material = await this.materialRepository.create({
      tenantId,
      uom,
      quantity,
      cost,
      stockId
    })

    return material
  }
}
