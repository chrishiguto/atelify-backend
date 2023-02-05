import { Stock } from '@prisma/client'

import { ICreateStock } from '@modules/stock/useCases/createStock/CreateStockUseCase'

export interface IStockRepository {
  findAll(tenantId: string): Promise<Stock[]>
  create({ name }: ICreateStock): Promise<Stock>
}
