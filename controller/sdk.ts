import { Request, Response, NextFunction } from 'express'
import { spawn } from 'child_process'
import axios from 'axios'
import goodlog from 'good-logs'
import { SDK_DIR } from 'config/sdk-dir'
import { CODE, KEY, MESSAGE, RESPONSE } from 'constant'

/**
 * The SDKController class provides methods for interacting with the NBA API.
 *
 * @path {base_sdk_url}/sdk
 */
class SDKController {
  private static _playerId: string
  private static _teamId: string
  private static _teamAbbv: string

  static setPlayerId(req: Request) {
    this._playerId = req.params.id
  }

  static setTeamId(req: Request) {
    this._teamId = req.params.id
  }

  static setTeamAbbv(req: Request) {
    this._teamAbbv = req.params.abbv
  }

  /**
   * Retrieves all teams.
   *
   * @route   {GET} /sdk/team
   * @access  public
   */
  public static async getAllTeam(_req: Request, res: Response, _next: NextFunction) {
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

  /**
   * Retrieves information about a specific team.
   *
   * @route   {GET} /sdk/team/:_teamId
   * @access  public
   */
  public static async getTeam(req: Request, res: Response, _next: NextFunction) {
    try {
      const teamId = req.params.id

      if (!teamId) {
        res.status(CODE.UNPROCESSABLE_ENTITY).send(RESPONSE.UNPROCESSABLE_ENTITY(MESSAGE.NO_ID))
      } else {
        const teams = await axios.get(SDK_DIR.TEAM_INFO(teamId))

        if (!teams.data) {
          res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
        } else {
          res.status(CODE.OK).send(RESPONSE.OK(teams.data))
        }
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  /**
   * Retrieves information about a specific team.
   *
   * @route   {GET} /sdk/team/find/:_teamAbbv
   * @access  public
   */
  public static async getTeamByAbbv(req: Request, res: Response, next: NextFunction) {
    try {
      const abbv = req.params.abbv

      if (!abbv) {
        res.status(CODE.UNPROCESSABLE_ENTITY).send(RESPONSE.UNPROCESSABLE_ENTITY(MESSAGE.NO_ABBV))
      } else {
        const team = await axios.get(SDK_DIR.TEAM_FIND(abbv))

        if (!team.data) {
          res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
        } else {
          res.status(CODE.OK).send(RESPONSE.OK(team.data))
        }
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

      if (!playerId) {
        res.status(CODE.UNPROCESSABLE_ENTITY).send(RESPONSE.UNPROCESSABLE_ENTITY(MESSAGE.NO_ID))
      } else {
        const player = await axios.get(SDK_DIR.PLAYER_INFO(playerId))

        if (!player.data) {
          res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
        } else {
          res.status(CODE.OK).send(RESPONSE.OK(player.data))
        }
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  public static async getPlayerAward(req: Request, res: Response, next: NextFunction) {
    try {
      const playerId = req.params.id

      if (!playerId) {
        res.status(CODE.UNPROCESSABLE_ENTITY).send(RESPONSE.UNPROCESSABLE_ENTITY(MESSAGE.NO_ID))
      } else {
        const playerAward = await axios.get(SDK_DIR.PLAYER_AWARD(playerId))

        if (!playerAward.data) {
          res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
        } else {
          res.status(CODE.OK).send(RESPONSE.OK(playerAward.data))
        }
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  public static async getPlayerCareer(req: Request, res: Response, next: NextFunction) {
    try {
      const playerId = req.params.id

      if (!playerId) {
        res.status(CODE.UNPROCESSABLE_ENTITY).send(RESPONSE.UNPROCESSABLE_ENTITY(MESSAGE.NO_ID))
      } else {
        const playerCareer = await axios.get(SDK_DIR.PLAYER_CAREER(playerId))

        if (!playerCareer.data) {
          res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
        } else {
          res.status(CODE.OK).send(RESPONSE.OK(playerCareer.data))
        }
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  public static async getDraftHistory(_req: Request, res: Response, _next: NextFunction) {
    try {
      const draftHistory = await axios.get(SDK_DIR.DRAFT_HISTORY)

      if (!draftHistory.data) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
      } else {
        res.status(CODE.OK).send(RESPONSE.OK(draftHistory.data))
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  public static async spawnPy(_req: Request, res: Response, _next: NextFunction) {
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
