import { NextFunction, Request, Response } from 'express'

import { FindAllStockUseCase } from '@modules/stock/useCases/findAllStock/FindAllStockUseCase'

export class FindAllStockController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_client } = req

      const findAllStockUseCase = new FindAllStockUseCase()

      const item = await findAllStockUseCase.execute(id_client)

      res.json(item)
    } catch (err) {
      next(err)
    }
  }
}
