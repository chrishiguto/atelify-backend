import { NextFunction, Request, Response } from 'express'
import { UpdateProductUseCase } from './UpdateProductUseCase'

export class UpdateProductController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { name, materials } = req.body
      const { id_client } = req

      const updateProductUseCase = new UpdateProductUseCase()

      const product = await updateProductUseCase.execute({
        id,
        tenantId: id_client,
        materials,
        name
      })

      return res.json(product)
    } catch (err) {
      next(err)
    }
  }
}
