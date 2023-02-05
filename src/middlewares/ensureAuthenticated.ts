import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new Error('Header is missing')
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub } = jwt.verify(
      token,
      'f5d8d8d37c319367aba22471e5b9644b713b3a6166928e3e13941ad5856e66af'
    )

    req.id_client = sub as string

    return next()
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid token'
    })
  }
}
