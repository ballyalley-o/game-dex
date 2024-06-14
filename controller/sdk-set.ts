import { Request, Response, NextFunction } from 'express'
import { Player, League } from 'model'
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
      const [playerBioResponse, playerCommonResponse] = await Promise.all([axios.get(SDK_DIR.PLAYER_ALL), axios.get(SDK_DIR.COMMON_ALL_PLAYER)])
      const playerLeagues = await League.find()
      const playerData = playerBioResponse.data
      const playerCommonData = playerCommonResponse.data.CommonAllPlayers

      // Check if playerCommonData is an array
      if (!Array.isArray(playerCommonData)) {
        console.log('playerCommonData', playerCommonData)
        throw new TypeError('playerCommonData is not an array')
      }

      const players = playerData.map((player: Player) => ({
        apiCode: player.id,
        firstname: player.first_name,
        lastname: player.last_name,
        isActive: player.is_active
      }))

      playerCommonData.forEach((playerCommon: Player) => {
        const player = players.find((p: Player) => p.apiCode === playerCommon.PERSON_ID)
        if (player) {
          player.slug = [playerCommon.PLAYER_SLUG]
          player.playerCode = playerCommon.PLAYERCODE

          playerLeagues.forEach((league: League) => {
            if (league.apiCode === playerCommon.OTHERLEAGUE_EXPERIENCE_CH) {
              player.leagues = [league._id]
            }
          })
        }
      })

      await Player.insertMany(players)

      res.status(players.length > 0 ? CODE.CREATED : CODE.NO_CONTENT).send(players.length > 0 ? RESPONSE.CREATED_ALL : RESPONSE.NO_CONTENT([]))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }
}

export default SDKSetController
