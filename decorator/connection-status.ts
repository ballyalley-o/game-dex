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
