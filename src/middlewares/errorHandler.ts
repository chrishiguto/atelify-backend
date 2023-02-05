import { NextFunction, Request, Response } from 'express'
import { HttpError } from '../utils/errors'
import { PrismaClientValidationError } from '@prisma/client/runtime'

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error)
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      message: error.message
    })
  }

  if (error instanceof PrismaClientValidationError) {
    return res.status(400).json({
      message: 'Invalid request.'
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
}
