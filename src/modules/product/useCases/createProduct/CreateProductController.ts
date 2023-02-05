import { NextFunction, Request, Response } from 'express'

import { CreateProductUseCase } from '@modules/product/useCases/createProduct/CreateProductUseCase'

export class CreateProductController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body
      const { id_client } = req

      const createProductUseCase = new CreateProductUseCase()

      const product = await createProductUseCase.execute({
        name,
        tenantId: id_client
      })

      return res.json(product)
    } catch (err) {
      next(err)
    }
  }
}
