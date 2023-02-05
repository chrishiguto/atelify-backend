import { NextFunction, Request, Response } from 'express'

import { CreateStockUseCase } from '@modules/stock/useCases/createStock/CreateStockUseCase'

export class CreateStockController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body
      const { id_client } = req

      const createStockUseCase = new CreateStockUseCase()

      const item = await createStockUseCase.execute({
        name,
        tenantId: id_client
      })

      res.json(item)
    } catch (err) {
      next(err)
    }
  }
}
