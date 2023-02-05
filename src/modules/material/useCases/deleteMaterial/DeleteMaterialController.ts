import { NextFunction, Request, Response } from 'express'

import { DeleteMaterialUseCase } from '@modules/material/useCases/deleteMaterial/DeleteMaterialUseCase'

export class DeleteMaterialController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { id_client } = req

      const deleteMaterialUseCase = new DeleteMaterialUseCase()

      const material = await deleteMaterialUseCase.execute({
        id,
        tenantId: id_client
      })

      return res.json(material)
    } catch (err) {
      next(err)
    }
  }
}
