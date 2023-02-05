import { container } from 'tsyringe'
import { IMaterialRepository } from '@modules/material/infra/repository/IMaterialRepository'
import { MaterialRepository } from '@modules/material/infra/repository/MaterialRepository'

export class FindAllMaterialUseCase {
  private materialRepository: IMaterialRepository

  constructor() {
    this.materialRepository = container.resolve(MaterialRepository)
  }

  async execute(tenantId: string) {
    const materials = await this.materialRepository.findAll(tenantId)

    return materials
  }
}
