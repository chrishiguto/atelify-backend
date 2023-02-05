import { container } from 'tsyringe'
import { IMaterialRepository } from '@modules/material/infra/repository/IMaterialRepository'
import { MaterialRepository } from '@modules/material/infra/repository/MaterialRepository'
import { HttpError } from '@utils/errors'

export type IDeleteMaterial = {
  id: string
  tenantId: string
}

export class DeleteMaterialUseCase {
  private materialRepository: IMaterialRepository

  constructor() {
    this.materialRepository = container.resolve(MaterialRepository)
  }

  async execute({ id, tenantId }: IDeleteMaterial) {
    const material = await this.materialRepository.findById(id)

    if (!material) {
      throw new HttpError(400, 'No material found.')
    }

    await this.materialRepository.delete({
      id,
      tenantId
    })

    return material
  }
}
