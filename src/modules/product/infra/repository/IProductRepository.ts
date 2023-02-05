import { Product } from '@prisma/client'

import { IUpdateProduct } from '@modules/product/useCases/updateProduct/UpdateProductUseCase'
import { ICreateProduct } from '@modules/product/useCases/createProduct/CreateProductUseCase'
import { IFindProductById } from '@modules/product/useCases/findByIdProduct/FindByIdProductUseCase'

export interface IProductRepository {
  create(args: ICreateProduct): Promise<Product>
  update(args: IUpdateProduct): Promise<Product | null>
  findAll(tenantId: string): Promise<Product[]>
  findById(args: IFindProductById): Promise<Product | null>
}
