import { Product, ProductMaterial } from '@prisma/client'

import { ICreateProductMaterial } from '../../useCases/createProductMaterial/CreateProductMaterialUseCase'

export interface IProductMaterialRepository {
  create(args: ICreateProductMaterial): Promise<ProductMaterial>
}
