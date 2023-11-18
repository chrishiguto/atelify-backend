import { container } from 'tsyringe'
import { IMaterialRepository } from '@modules/material/infra/repository/IMaterialRepository'
import { MaterialRepository } from '@modules/material/infra/repository/MaterialRepository'

export class FindByIdMaterialUseCase {
  private materialRepository: IMaterialRepository

  constructor() {
    this.materialRepository = container.resolve(MaterialRepository)
  }

  async execute(id: string, tenantId: string) {
    const material = await this.materialRepository.findById(
      id,
      tenantId
    )

    return material
  }
}
