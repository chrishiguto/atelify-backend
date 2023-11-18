import { NextFunction, Request, Response } from 'express'

import { FindByIdMaterialUseCase } from './FindByIdMaterialUseCase'

export class FindByIdMaterialController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { id_client } = req

      const findByIdMaterialUseCase = new FindByIdMaterialUseCase()

      const material = await findByIdMaterialUseCase.execute(id, id_client)

      return res.json(material)
    } catch (err) {
      next(err)
    }
  }
}
