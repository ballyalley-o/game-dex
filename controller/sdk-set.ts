import { Request, Response, NextFunction } from 'express'
import { Player } from 'model'
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

  public static async createPlayerBase(_req: Request, res: Response, _next: NextFunction) {
    try {
      const playerBioData = await axios.get(SDK_DIR.PLAYER_ALL)
      const playerData = playerBioData.data

      let players = []

      for (let i = 0; i < playerData.length; i++) {
        const player = playerData[i]
        const apiCode = player.id
        const firstname = player.first_name
        const lastname = player.last_name
        const isActive = player.is_active

        const playerBase: Player = { ...apiCode, firstname, lastname, isActive }

        players.push(playerBase)
      }

      const playerCommonData = await axios.get(SDK_DIR.COMMON_ALL_PLAYER)

      for (let i = 0; i < playerCommonData.data.length; i++) {
        const playerCommon = playerCommonData.data[i]
        const player = players.find((p) => p.apiCode === playerCommon.PERSON_ID)

        if (player) {
          const slug = [playerCommon.PLAYER_SLUG]
          const playerCode = playerCommon.PLAYERCODE
          const leagues = [playerCommon.OTHERLEAGUE_EXPERIENCE_CH]

          player.slug = slug
          player.playerCode = playerCode
          player.leagues = leagues

          await player.save()
        }
      }

      await Player.insertMany(players)

      if (players.length > 0) {
        res.status(CODE.CREATED).send(RESPONSE.CREATED_ALL)
      } else {
        res.status(CODE.NO_CONTENT).send(RESPONSE.NO_CONTENT([]))
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }
}

export default SDKSetController
