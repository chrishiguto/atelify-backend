import { NextFunction, Request, Response } from 'express'
import { CreateMaterialUseCase } from '@modules/material/useCases/createMaterial/CreateMaterialUseCase'

export class CreateMaterialController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { uom, quantity, cost } = req.body
      const { id_client } = req

      const createMaterialUseCase = new CreateMaterialUseCase()

      const result = await createMaterialUseCase.execute({
        tenantId: id_client,
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
