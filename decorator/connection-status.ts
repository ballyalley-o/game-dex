/**
 * Decorator that sets the connection status of an object.
 * @param target - The target object.
 * @param propertyKey - The name of the property being decorated.
 * @param descriptor - The property descriptor.
 * @returns The modified property descriptor.
 */
function ConnectionStatus(target: IsConnected, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value

  descriptor.value = function (...args: any[]) {
    try {
      originalMethod.apply(this, args)
      ;(this as IsConnected).isConnected = true
    } catch (error: any) {
      ;(this as IsConnected).isConnected = false
      throw error
    }
  }
  return descriptor
}

export default ConnectionStatus
