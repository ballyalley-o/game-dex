const SLASH = '/'

export const conNex: IConNex = (...params) => {
  return params.join(SLASH)
}

export const conNexSegment: IConNex = (...params) => {
  return SLASH + params.join(SLASH)
}
