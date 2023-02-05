import { NextFunction, Request, Response } from 'express'
import { UpdateMaterialUseCase } from '@modules/material/useCases/updateMaterial/UpdateMaterialUseCase'

export class UpdateMaterialController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { uom, quantity, cost } = req.body

      const updateMaterialUseCase = new UpdateMaterialUseCase()

      const result = await updateMaterialUseCase.execute({
        id,
        uom,
        quantity,
        cost
      })

      return res.json(result)
    } catch (err) {
      next(err)
    }
  }
}
