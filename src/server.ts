import 'reflect-metadata'
import './shared/container'
import express from 'express'
import { errorHandler } from './middlewares/errorHandler'
import { routes } from './routes'

const app = express()

app.use(express.json())

app.use(routes)

app.use(errorHandler)

app.listen(1337, () => {
    console.log('🤘 Server launched!')
})
