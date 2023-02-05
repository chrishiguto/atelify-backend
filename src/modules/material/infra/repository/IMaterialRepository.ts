import { Material } from '@prisma/client'

import { ICreateMaterial } from '@modules/material/useCases/createMaterial/CreateMaterialUseCase'
import { IUpdateMaterial } from '@modules/material/useCases/updateMaterial/UpdateMaterialUseCase'
import { IDeleteMaterial } from '@modules/material/useCases/deleteMaterial/DeleteMaterialUseCase'

export interface IMaterialRepository {
  create(args: ICreateMaterial): Promise<Material>
  findAll(tenantId: string): Promise<Material[]>
  findById(findById: string): Promise<Material | null>
  update(args: IUpdateMaterial): Promise<Material>
  delete(args: IDeleteMaterial): Promise<Material>
}
