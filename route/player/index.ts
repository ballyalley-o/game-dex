import { Application } from 'express'
import { PATH_DIR } from 'config'
import playerRoute from './player'

const linkPlayerRoute = (app: Application) => {
  app.use(PATH_DIR.PLAYER, playerRoute)
}

export { linkPlayerRoute }
