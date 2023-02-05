import { UoM } from '@prisma/client'
import { container } from 'tsyringe'
import { IMaterialRepository } from '@modules/material/infra/repository/IMaterialRepository'
import { MaterialRepository } from '@modules/material/infra/repository/MaterialRepository'

export interface IUpdateMaterial {
  id: string
  uom?: UoM
  quantity?: number
  cost?: number
}

export class UpdateMaterialUseCase {
  private materialRepository: IMaterialRepository

  constructor() {
    this.materialRepository = container.resolve(MaterialRepository)
  }

  async execute({ id, ...data }: IUpdateMaterial) {
    const material = await this.materialRepository.update({
      id,
      ...data
    })

    return material
  }
}
