import { NextFunction, Request, Response } from 'express'

import { FindAllMaterialUseCase } from '@modules/material/useCases/findAllMaterial/FindAllMaterialUseCase'

export class FindAllMaterialController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_client } = req

      const findAllMaterialUseCase = new FindAllMaterialUseCase()

      const materials = await findAllMaterialUseCase.execute(id_client)

      return res.json(materials)
    } catch (err) {
      next(err)
    }
  }
}
