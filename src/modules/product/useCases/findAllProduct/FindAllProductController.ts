import { NextFunction, Request, Response } from 'express'

import { FindAllProductUseCase } from '@modules/product/useCases/findAllProduct/FindAllProductUseCase'

export class FindAllProductController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_client } = req

      const createProductUseCase = new FindAllProductUseCase()

      const product = await createProductUseCase.execute(id_client)

      return res.json(product)
    } catch (err) {
      next(err)
    }
  }
}
