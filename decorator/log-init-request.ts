import 'colors'
import goodlog from 'good-logs'
import { Request, Response, NextFunction } from 'express'

/**
 * Decorator function that logs the initialization of a connection request.
 * @param target - The target object.
 * @param key - The name of the method being decorated.
 * @param descriptor - The property descriptor of the method being decorated.
 * @returns The modified property descriptor.
 */
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
