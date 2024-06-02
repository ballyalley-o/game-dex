import 'colors'
import goodlog from 'good-logs'
import { Request, Response, NextFunction } from 'express'

export function LogInitRequest(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value

  descriptor.value = function (req: Request, res: Response, next: NextFunction) {
    console.log('')
    goodlog.warn(` [${new Date().toISOString()}] ${'Connection Request Initialized'.green} ${key} `)
    console.log('')
    originalMethod.call(this, req, res, next)
  }

  return descriptor
}

export default LogInitRequest
