import { NextFunction, Request, Response } from 'express'

import { FindByIdProductUseCase } from '@modules/product/useCases/findByIdProduct/FindByIdProductUseCase'

export class FindByIdProductController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { id_client } = req

      const createProductUseCase = new FindByIdProductUseCase()

      const product = await createProductUseCase.execute({
        id,
        tenantId: id_client
      })

      return res.json(product)
    } catch (err) {
      next(err)
    }
  }
}
