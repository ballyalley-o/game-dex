import { Request, Response, NextFunction } from 'express'
import { spawn } from 'child_process'
import axios from 'axios'
import goodlog from 'good-logs'
import { SDK_DIR } from 'config/sdk-dir'
import { CODE, KEY, MESSAGE, RESPONSE, QPARAM } from 'constant'

class SDKSetController {
  private static _playerId: string
  private static _teamId: string

  static setPlayerId(req: Request) {
    this._playerId = req.params.id
  }

  public static async createPlayerBase(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {}
  }
}

export default SDKSetController
