import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import goodlog from 'good-logs'
import { Player, League } from 'model'
import { SDK_DIR } from 'config/sdk-dir'
import { CODE, MESSAGE, RESPONSE } from 'constant'

class PlayerController {
  private static _playerId: string
  private static _teamId: string

  static setPlayerId(req: Request) {
    this._playerId = req.params.id
  }

  public static async getAllPlayer(_req: Request, res: Response, _next: NextFunction) {
    try {
      const players = await Player.find()

      if (!players) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND)
        return
      }

      res.status(CODE.OK).send(RESPONSE.OK(players))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }
}

export default PlayerController
