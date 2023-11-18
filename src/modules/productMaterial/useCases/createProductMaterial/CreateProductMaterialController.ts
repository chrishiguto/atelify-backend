import { NextFunction, Request, Response } from 'express'

import { CreateProductMaterialUseCase } from './CreateProductMaterialUseCase'
import { FindByIdMaterialUseCase } from '@app/modules/material/useCases/findAllMaterial copy/FindByIdMaterialUseCase'
import { UpdateMaterialUseCase } from '@app/modules/material/useCases/updateMaterial/UpdateMaterialUseCase'

export class CreateProductMaterialController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { materialId, productId, quantity } = req.body
      const { id_client } = req

      const createProductMaterialUseCase = new CreateProductMaterialUseCase()

      const product = await createProductMaterialUseCase.execute({
        tenantId: id_client,
        materialId,
        productId,
        quantity,
      })

      return res.json(product)
    } catch (err) {
      next(err)
    }
  }
}
