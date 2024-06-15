import { Request, Response, NextFunction } from 'express'
import { Player, League, Franchise } from 'model'
import axios from 'axios'
import goodlog from 'good-logs'
import { SDK_DIR } from 'config/sdk-dir'
import { CODE, KEY, MESSAGE, RESPONSE, QPARAM, TEAM_ID } from 'constant'

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

  public static async createFranchiseHistory(_req: Request, res: Response, _next: NextFunction) {
    try {
      const franchiseCall = async () => {
        try {
          const res = await axios.get(SDK_DIR.FRANCHISE_HISTORY)
          return res.data.FranchiseHistory
        } catch (error: any) {
          goodlog.error(error)
          res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
        }
      }

      const franchiseData = await franchiseCall()
      const teamHistoriesByTeamId: { [key: string]: any[] } = {}

      for (const f of franchiseData) {
        const franchiseLeague = await League.findOne({ apiCode: f.LEAGUE_ID })

        if (!franchiseLeague) {
          goodlog.log('League not found')
          continue
        }

        const teamHistory = {
          apiCode: f.TEAM_ID,
          league: franchiseLeague._id,
          teamCity: f.TEAM_CITY,
          teamName: f.TEAM_NAME,
          founded: f.START_YEAR,
          history: f.START_YEAR + ' - ' + f.END_YEAR,
          years: f.END_YEAR - f.START_YEAR,
          games: f.GAMES,
          wins: f.WINS,
          losses: f.LOSSES,
          playoffAppearances: f.PO_APPEARANCES,
          divisionTitles: f.DIV_TITLES,
          conferenceTitles: f.CONF_TITLES,
          championships: f.LEAGUE_TITLES
        }

        if (!teamHistoriesByTeamId[f.TEAM_ID]) {
          teamHistoriesByTeamId[f.TEAM_ID] = []
        }

        teamHistoriesByTeamId[f.TEAM_ID].push(teamHistory)
      }

      const finalTeamHistories = Object.values(teamHistoriesByTeamId).map((histories) => {
        if (histories.length === 1) {
          return histories[0]
        }

        histories.sort((a, b) => b.years - a.years)
        const mainHistory = histories[0]
        mainHistory.teamHistory = histories.slice(1)

        return mainHistory
      })

      //   const finalTeamHistories = []
      //   for (const histories of Object.values(teamHistoriesByTeamId)) {
      //     if (histories.length === 1) {
      //       finalTeamHistories.push(histories[0])
      //       continue
      //     }

      //     histories.sort((a, b) => b.years - a.years)
      //     const mainHistory = histories[0]
      //     const historyDocuments = await Franchise.insertMany(histories.slice(1))
      //     mainHistory.teamHistory = historyDocuments.map((doc) => doc._id)

      //     finalTeamHistories.push(mainHistory)
      //   }

      await Franchise.insertMany(finalTeamHistories)

      res
        .status(finalTeamHistories.length > 0 ? CODE.CREATED : CODE.NO_CONTENT)
        .send(finalTeamHistories.length > 0 ? RESPONSE.CREATED_ALL : RESPONSE.NO_CONTENT([]))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }
}

export default SDKSetController
