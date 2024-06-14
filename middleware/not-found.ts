import 'colors'
import { Request, Response, NextFunction } from 'express'
import { CODE } from 'constant'

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`[NOT FOUND] - ${req.originalUrl}`.red)
  res.status(CODE.NOT_FOUND)
  next(error)
}

export default notFound
