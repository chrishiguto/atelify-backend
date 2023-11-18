import { Router } from 'express'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { CreateMaterialController } from './modules/material/useCases/createMaterial/CreateMaterialController'
import { DeleteMaterialController } from './modules/material/useCases/deleteMaterial/DeleteMaterialController'
import { FindAllMaterialController } from './modules/material/useCases/findAllMaterial/FindAllMaterialController'
import { UpdateMaterialController } from './modules/material/useCases/updateMaterial/UpdateMaterialController'
import { CreateProductController } from './modules/product/useCases/createProduct/CreateProductController'
import { FindAllProductController } from './modules/product/useCases/findAllProduct/FindAllProductController'
import { FindByIdProductController } from './modules/product/useCases/findByIdProduct/FindByIdProductController'
import { UpdateProductController } from './modules/product/useCases/updateProduct/UpdateProductController'
import { CreateStockController } from './modules/stock/useCases/createStock/CreateStockController'
import { FindAllStockController } from './modules/stock/useCases/findAllStock/FindAllStockController'
import { CreateUserController } from './modules/user/useCases/createUser/CreateUserController'
import { SignInUserController } from './modules/user/useCases/signInUser/SignInUserController'
import { CreateProductMaterialController } from './modules/productMaterial/useCases/createProductMaterial/CreateProductMaterialController'

const routes = Router()

const createUserController = new CreateUserController()
const signInUserController = new SignInUserController()

const createMaterialController = new CreateMaterialController()
const updateMaterialController = new UpdateMaterialController()
const deleteMaterialController = new DeleteMaterialController()
const findAllMaterialController = new FindAllMaterialController()

const findAllStockController = new FindAllStockController()
const createStockController = new CreateStockController()

const findAllProductController = new FindAllProductController()
const findByIdProductController = new FindByIdProductController()
const createProductController = new CreateProductController()
const updateProductController = new UpdateProductController()

const createProductMaterialController = new CreateProductMaterialController()

routes.post('/login', signInUserController.handle)
routes.post('/sign-up', createUserController.handle)

routes.get('/material', ensureAuthenticated, findAllMaterialController.handle)
routes.post('/material', ensureAuthenticated, createMaterialController.handle)
routes.put(
  '/material/:id',
  ensureAuthenticated,
  updateMaterialController.handle
)
routes.delete(
  '/material/:id',
  ensureAuthenticated,
  deleteMaterialController.handle
)

routes.get('/stock', ensureAuthenticated, findAllStockController.handle)
routes.post('/stock', ensureAuthenticated, createStockController.handle)

routes.get('/product', ensureAuthenticated, findAllProductController.handle)
routes.get(
  '/product/:id',
  ensureAuthenticated,
  findByIdProductController.handle
)
routes.post('/product', ensureAuthenticated, createProductController.handle)
routes.put('/product/:id', ensureAuthenticated, updateProductController.handle)

routes.post('/product-material', ensureAuthenticated, createProductMaterialController.handle)

export { routes }
