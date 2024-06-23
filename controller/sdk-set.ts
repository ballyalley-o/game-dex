import { Request, Response, NextFunction } from 'express'
import { Player, League, Franchise, Team, TeamStatsOverview } from 'model'
import axios from 'axios'
import goodlog from 'good-logs'
import { SDK_DIR } from 'config/sdk-dir'
import { CODE, MESSAGE, RESPONSE, TEAM_ABBV_NAMES, TEAM_ABBV_ARR } from 'constant'
import SDKController from './sdk'
import { TeamPlayoffsStats, TeamRegularSeasonStats } from 'model/stats'

class SDKSetController {
  private static _playerId: string
  private static _teamId: string

  static setPlayerId(req: Request) {
    this._playerId = req.params.id
  }

  /**
   * Creates player base data.
   *
   * @returns A promise that resolves to the created players.
   * @throws {TypeError} If the playerCommonData is not an array.
   */
  public static async createPlayerBase(_req: Request, res: Response, _next: NextFunction) {
    try {
      const [playerBioResponse, playerCommonResponse] = await Promise.all([axios.get(SDK_DIR.PLAYER_ALL), axios.get(SDK_DIR.COMMON_ALL_PLAYER)])
      const playerLeagues = await League.find()
      const playerData = playerBioResponse.data
      const playerCommonData = playerCommonResponse.data.CommonAllPlayers

      if (!Array.isArray(playerCommonData)) {
        throw new TypeError(MESSAGE.NOT_AN_ARRAY(playerCommonData))
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

  /**
   * Creates franchise history records based on the NBA API data.
   *
   * @returns A promise that resolves to the created franchise history records.
   * @throws If there is an error while creating the franchise history records.
   */
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
          goodlog.log(MESSAGE.NOT_FOUND)
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

      await Franchise.insertMany(finalTeamHistories)

      res
        .status(finalTeamHistories.length > 0 ? CODE.CREATED : CODE.NO_CONTENT)
        .send(finalTeamHistories.length > 0 ? RESPONSE.CREATED_ALL : RESPONSE.NO_CONTENT([]))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Creates team base data.
   *
   * @returns A promise that resolves to the created teams.
   * @throws If there is an error while creating the teams.
   */
  public static async createTeamBase(_req: Request, res: Response, _next: NextFunction) {
    try {
      const getAllTeam = async () => {
        try {
          const teams = await axios.get(SDK_DIR.TEAM_ALL)
          return teams.data
        } catch (error: any) {
          goodlog.error(error)
          res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
        }
      }

      const teamData = await getAllTeam()
      const teams = teamData.map((team: Team) => ({
        apiCode: team.id,
        name: team.full_name,
        abbreviation: team.abbreviation,
        city: team.city,
        state: team.state,
        nickname: team.nickname,
        statsHistory: [],
        stats: {}
      }))

      const teamStatHistory: { [key: string]: any[] } = {}

      for (const team of teams) {
        const franchise = await Franchise.findOne({ apiCode: team.apiCode })

        if (!franchise) {
          goodlog.log(MESSAGE.NOT_FOUND)
          continue
        }

        team.franchise = franchise._id
      }

      const teamAbbvArr = TEAM_ABBV_ARR

      for (const team of teamAbbvArr) {
        const teamData = teams.find((t: any) => t.abbreviation === team)
        const statsHistoryData = await SDKController.getTeamSeasonStats(team)

        if (teamData) {
          // save to the TeamStats collection first then save the reference to the team
          for (const statsHistory of statsHistoryData.TeamStats) {
            const teamStatsRegData = {
              team: null,
              apiCode: statsHistory.TEAM_ID,
              season: statsHistory.YEAR,
              gamesPlayed: statsHistory.GP,
              wins: statsHistory.WINS,
              losses: statsHistory.LOSSES,
              winPercentage: statsHistory.WIN_PCT,
              conferenceRank: statsHistory.CONF_RANK,
              divisionRank: statsHistory.DIV_RANK,
              finalsAppearances: statsHistory.NBA_FINALS_APPEARANCE,
              fieldGoalsMade: statsHistory.FGM,
              fieldGoalsAttempted: statsHistory.FGA,
              fieldGoalPercentage: statsHistory.FG_PCT,
              threePointersMade: statsHistory.FG3M,
              threePointersAttempted: statsHistory.FG3A,
              threePointPercentage: statsHistory.FG3_PCT,
              freeThrowsMade: statsHistory.FTM,
              freeThrowsAttempted: statsHistory.FTA,
              freeThrowPercentage: statsHistory.FT_PCT,
              points: statsHistory.PTS,
              rebounds: statsHistory.REB,
              offensiveRebounds: statsHistory.OREB,
              defensiveRebounds: statsHistory.DREB,
              assists: statsHistory.AST,
              steals: statsHistory.STL,
              blocks: statsHistory.BLK,
              personalFouls: statsHistory.PF,
              turnovers: statsHistory.TOV,
              pointsRank: statsHistory.PTS_RANK
            }
            const teamStatsPOData = {
              team: null,
              apiCode: statsHistory.TEAM_ID,
              wins: statsHistory.PO_WINS,
              losses: statsHistory.PO_LOSSES
            }

            const teamRegStats = await TeamRegularSeasonStats.create(teamStatsRegData)
            const teamPOStats = await TeamPlayoffsStats.create(teamStatsPOData)

            const teamOverview = {
              team: null,
              regularSeasonStats: teamRegStats,
              playoffsStats: teamPOStats
            }

            // create the team starts overview
            const teamOverviewData = await TeamStatsOverview.create(teamOverview)
            teamData.statsHistory.push(teamOverviewData)
          }
          // the index (latest season) of the stats history will be the stats of the team
          teamData.stats = teamData.statsHistory[teamData.statsHistory.length - 1]

          const newTeam = await Team.create(teamData)
          for (const statsHistory of teamData.statsHistory) {
            await TeamStatsOverview.updateOne({ _id: statsHistory._id }, { team: newTeam._id })
          }
        }
      }

      res.status(teams.length > 0 ? CODE.CREATED : CODE.NO_CONTENT).send(teams.length > 0 ? RESPONSE.CREATED_ALL : RESPONSE.NO_CONTENT([]))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }
}

export default SDKSetController
