import { conNex } from 'lib'
import { GLOBAL } from 'config/global'
import { SEGMENT } from 'constant'

export const PATH_DIR = {
  API: conNex(SEGMENT.API, GLOBAL.API_VERSION),
  SDK: conNex(SEGMENT.API, GLOBAL.API_VERSION, SEGMENT.SDK)
}
