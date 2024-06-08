import { Request, Response, NextFunction } from 'express'
import { spawn } from 'child_process'
import goodlog from 'good-logs'
import { CODE, KEY, MESSAGE, RESPONSE } from 'constant'
import axios from 'axios'
import { SDK_DIR } from 'config/sdk-dir'

/**
 * The SDKController class provides methods for interacting with the NBA API.
 */
class SDKController {
  private static _userId: string

  static setUserId(req: UserRequest) {
    this._userId = req.user.id
  }

  public static async getAllTeam(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await axios.get(SDK_DIR.TEAM_ALL)

      if (!teams.data) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
      } else {
        res.status(CODE.OK).send(RESPONSE.OK(teams.data))
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  public static async getTeam(req: Request, res: Response, next: NextFunction) {
    try {
      const teamId = req.params.id
      const teams = await axios.get(SDK_DIR.TEAM_INFO(teamId))

      if (!teams.data) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
      } else {
        res.status(CODE.OK).send(RESPONSE.OK(teams.data))
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  public static async getTeamByAbbv(req: Request, res: Response, next: NextFunction) {
    try {
      const abbv = req.params.abbv
      const teams = await axios.get(SDK_DIR.TEAM_FIND(abbv))

      if (!teams.data) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
      } else {
        res.status(CODE.OK).send(RESPONSE.OK(teams.data))
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  public static async getAllPlayer(req: Request, res: Response, next: NextFunction) {
    try {
      const players = await axios.get(SDK_DIR.PLAYER_ALL)

      if (!players.data) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
      } else {
        res.status(CODE.OK).send(RESPONSE.OK(players.data))
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  public static async getPlayer(req: Request, res: Response, next: NextFunction) {
    try {
      const playerId = req.params.id
      const players = await axios.get(SDK_DIR.PLAYER_INFO(playerId))

      res.status(CODE.OK).send(RESPONSE.OK(players.data))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  public static async getDraftHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const draftHistory = await axios.get(SDK_DIR.DRAFT_HISTORY)

      res.status(CODE.OK).send(RESPONSE.OK(draftHistory.data))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  public static async spawnPy(req: Request, res: Response, next: NextFunction) {
    const python = spawn(KEY.PYTHON, ['sdk/server-games.py'])
    let dataToSend: any

    python.stdout.on(KEY.DATA, function (data) {
      goodlog.log(RESPONSE.ON)
      dataToSend = data.toString()
    })

    python.on(KEY.CLOSE, (code) => {
      goodlog.log(RESPONSE.CLOSE(code))
      res.status(CODE.OK).json(dataToSend)
    })
  }
}

export default SDKController
