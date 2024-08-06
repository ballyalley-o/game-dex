import 'colors'
import { Request, Response, NextFunction } from 'express'
import {
  Player,
  League,
  Franchise,
  Season,
  Team,
  TeamStatsOverview,
  TeamPlayoffsStats,
  TeamRegularSeasonStats,
  Roster,
  Jersey,
  Coach,
  Role,
  CoachStaff
} from 'model'
import axios from 'axios'
import goodlog from 'good-logs'
import { PlayerController } from 'controller'
import { SDK_DIR } from 'config/sdk-dir'
import { CODE, MESSAGE, RESPONSE, TEAM_ABBV_NAMES, TEAM_ABBV_ARR, QPARAM, TAGS } from 'constant'
import SDKController from './sdk'
import RosterPlayer from 'model/RosterPlayer'

const TAG = TAGS.SDK_SET_CONTROLLER

class SDKSetController {
  private static _apiCode: string

  static setApiCode(req: Request) {
    this._apiCode = req.params.apiCode
  }

  /**
   * Creates player base data.
   *
   * @returns A promise that resolves to the created players.
   * @throws {TypeError} If the playerCommonData is not an array.
   */
  public static async createAllPlayerBase(_req: Request, res: Response, _next: NextFunction) {
    try {
      const [playerBioResponse, playerCommonResponse] = await Promise.all([axios.get(SDK_DIR.PLAYER_ALL), axios.get(SDK_DIR.COMMON_ALL_PLAYER)])
      const playerLeagues = await League.find()
      const playerData = playerBioResponse.data
      const playerCommonData = playerCommonResponse.data.CommonAllPlayers

      if (!Array.isArray(playerCommonData)) {
        throw new TypeError(MESSAGE.NOT_AN_ARRAY(playerCommonData))
      }

      const players = playerData.map((player: any) => ({
        apiCode: player.id,
        firstname: player.first_name,
        lastname: player.last_name,
        isActive: player.is_active
      }))

      playerCommonData.forEach((playerCommon: any) => {
        const player = players.find((p: any) => p.apiCode === playerCommon.PERSON_ID)
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

  public static async createPlayerBaseByApiCode(req: Request, res: Response, _next: NextFunction) {
    SDKSetController.setApiCode(req)
    try {
      const player = await axios.get(SDK_DIR.PLAYER_COMMON_INFO(SDKSetController._apiCode))
      const nba = await League.find({ apiCode: QPARAM.nba })
      const gLeague = await League.find({ apiCode: QPARAM.g_league })
      const playerCommonData = player.data.CommonPlayerInfo[0]

      const headlineStats = (playerHeadlineStats: any) => {
        return {
          playerCode: playerHeadlineStats.PLAYER_ID,
          timeFrame: playerHeadlineStats.TimeFrame,
          ppg: playerHeadlineStats.PTS,
          apg: playerHeadlineStats.AST,
          rpg: playerHeadlineStats.REB,
          allStarAppearances: playerHeadlineStats.ALL_STAR_APPEARANCES
        }
      }

      const newPlayer = {
        apiCode: playerCommonData.PERSON_ID,
        playerCode: playerCommonData.PLAYERCODE,
        firstname: playerCommonData.FIRST_NAME,
        lastname: playerCommonData.LAST_NAME,
        birthDate: playerCommonData.BIRTHDATE,
        height: playerCommonData.HEIGHT,
        weight: playerCommonData.WEIGHT,
        position: [playerCommonData.POSITION],
        fromYear: playerCommonData.FROM_YEAR,
        toYear: playerCommonData.TO_YEAR,
        nationality: playerCommonData.COUNTRY,
        headlineStats: headlineStats(player.data.PlayerHeadlineStats[0]),
        school: playerCommonData.SCHOOL,
        isActive: playerCommonData.ROSTERSTATUS === 'Inactive' ? false : true,
        isGreatest75: playerCommonData.GREATEST_75_FLAG === 'Y' ? true : false,
        slug: [playerCommonData.PLAYER_SLUG]
      } as Player

      if (playerCommonData.NBA_FLAG !== undefined && playerCommonData.DLEAGUE_FLAG !== undefined) {
        newPlayer.leagues = PlayerController.playerLeagues(playerCommonData.NBA_FLAG, nba, playerCommonData.DLEAGUE_FLAG, gLeague)
      }

      const newCreatedPlayer = await Player.create(newPlayer)

      res.status(CODE.CREATED).send(RESPONSE.CREATED(newCreatedPlayer))
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
            const teamOverviewData = await TeamStatsOverview.create(teamOverview)
            teamData.statsHistory.push(teamOverviewData)
          }
          teamData.stats = teamData.statsHistory[teamData.statsHistory.length - 1]

          const newTeam = await Team.create(teamData)
          for (const statsHistory of teamData.statsHistory) {
            await TeamStatsOverview.updateOne({ _id: statsHistory._id }, { team: newTeam._id })
            await TeamRegularSeasonStats.findOneAndUpdate({ _id: statsHistory.regularSeasonStats }, { $set: { team: newTeam._id } })
            await TeamPlayoffsStats.findOneAndUpdate({ _id: statsHistory.playoffsStats }, { $set: { team: newTeam._id } })
          }
        }
      }

      res.status(teams.length > 0 ? CODE.CREATED : CODE.NO_CONTENT).send(teams.length > 0 ? RESPONSE.CREATED_ALL : RESPONSE.NO_CONTENT([]))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }

  public static async createTeamRosterHistory(_req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await Team.find()
      let count = 0

      for (const team of teams) {
        const allSeasons = await SDKController.getAllTeamSeasons(team.abbreviation)
        let rosterHistory = []

        const roster = {
          team: team._id,
          season: null,
          players: [] as any,
          coachStaff: null
        }

        for (const season of allSeasons?.years ?? []) {
          const teamRoster = await axios.get(SDK_DIR.TEAM_ROSTER(team.apiCode), {
            params: {
              season: season
            }
          })
          const teamRosterData = teamRoster.data.CommonTeamRoster
          const seasonData = await Season.findOne({ fromYear: season })
          roster.season = seasonData?._id

          let rosterPlayerJersey = null
          try {
            for (const player of teamRosterData) {
              const teamPlayer = await Player.findOne({ apiCode: player.PLAYER_ID })
              const playerNum = Number(player.NUM)

              if (isNaN(playerNum)) {
                goodlog.error(
                  `Invalid number (${player.NUM.brightRed}) for player ${player.PLAYER_ID} in team ${team.name}`,
                  TAG,
                  ' createTeamRosterHistory.teamRosterData '
                )
                continue
              }

              if (player.NUM === '') {
                goodlog.custom('brightGreen', `Player ${player.PLAYER_ID} in team ${team.name} has no jersey number`)

                const playerJersey = {
                  apiCode: player.TeamID && player.PLAYER_ID ? player.TeamID + '-' + player.PLAYER_ID : null,
                  number: null,
                  team: team._id,
                  players: [teamPlayer?._id]
                }
                rosterPlayerJersey = await Jersey.create(playerJersey)
              } else {
                if (player.NUM.includes('-')) {
                  const playerNumArr = player.NUM.split('-').map(Number)

                  console.log('playerNumArr', playerNumArr)

                  for (const num of playerNumArr) {
                    const existingJersey = await Jersey.findOne({
                      number: num,
                      team: team._id,
                      players: { $elemMatch: { $eq: teamPlayer?._id } }
                    })

                    const existingJerseyNumber = await Jersey.findOne({
                      number: num,
                      team: team._id
                    })

                    if (existingJersey) {
                      goodlog.custom('brightGreen', `Jersey ${num} for ${team.name} already exists`)
                      continue
                    } else if (existingJerseyNumber) {
                      // push the player to the existing jersey
                      await Jersey.findOneAndUpdate({ _id: existingJerseyNumber._id }, { $push: { players: teamPlayer?._id } })
                      goodlog.custom(
                        'brightGreen',
                        `Jersey ${num} for ${team.name} already exists, player added | Season: ${season} - ${player.SEASON}`
                      )
                      continue
                    }
                  }
                }

                const existingJersey = await Jersey.findOne({
                  number: playerNum,
                  team: team._id,
                  players: { $elemMatch: { $eq: teamPlayer?._id } }
                })

                const existingJerseyNumber = await Jersey.findOne({
                  number: playerNum,
                  team: team._id
                })

                if (existingJersey) {
                  goodlog.custom('brightGreen', `Jersey ${player.NUM} for ${team.name} already exists`)
                  continue
                } else if (existingJerseyNumber) {
                  // push the player to the existing jersey
                  await Jersey.findOneAndUpdate({ _id: existingJerseyNumber._id }, { $push: { players: teamPlayer?._id } })
                  goodlog.custom(
                    'brightGreen',
                    `Jersey ${player.NUM} for ${team.name} already exists, player added | Season: ${season} - ${player.SEASON}`
                  )
                  continue
                }

                const playerJersey = {
                  apiCode: player.TeamID && player.PLAYER_ID ? player.TeamID + '-' + player.PLAYER_ID : null,
                  number: playerNum || null,
                  team: team._id,
                  players: [teamPlayer?._id]
                }

                rosterPlayerJersey = await Jersey.create(playerJersey)
              }

              const rosterSeason = await Season.findOne({ fromYear: player.SEASON })

              const teamRosterPlayer = {
                team: team._id,
                player: teamPlayer?._id,
                nickname: player.NICKNAME,
                season: rosterSeason?._id,
                jersey: rosterPlayerJersey?._id,
                position: player.POSITION,
                height: player.HEIGHT,
                weight: player.WEIGHT,
                age: player.AGE,
                experience: player.EXP,
                howAcquired: player.HOW_ACQUIRED,
                slug: [player.PLAYER_SLUG]
              }

              const newRosterPlayer = await RosterPlayer.create(teamRosterPlayer)
              roster.players.push(newRosterPlayer?._id)
            }
          } catch (error: any) {
            goodlog.error(error)
            res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
          }

          count++
          goodlog.custom('brightGreen', String(count) + ` ${team.name} roster history created | Season: ${season}`)
        }

        // create the roster
        const newRoster = await Roster.create(roster)
        rosterHistory.push(newRoster)

        await Team.findOneAndUpdate({ _id: team._id }, { $set: { rosterHistory, roster: rosterHistory[0] } })
      }

      res.status(CODE.CREATED).send(RESPONSE.CREATED_ALL)
    } catch (error: any) {
      goodlog.error(error, TAG, ' createTeamRosterHistory ')
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }

  public static async updateRosterHistoryWithCoachData(_req: Request, res: Response, _next: NextFunction) {
    try {
      const teams = await Team.find()
      let count = 0

      for (const team of teams) {
        const allSeasons = await SDKController.getAllTeamSeasons(team.abbreviation)
        for (const season of allSeasons?.years ?? []) {
          const teamRoster = await axios.get(SDK_DIR.TEAM_ROSTER(team.apiCode), {
            params: {
              season
            }
          })
          const teamRosterCoach = teamRoster.data.Coaches

          try {
            for (const coach of teamRosterCoach) {
              const coachStaffRole = await Role.findOne({ role: coach.COACH_TYPE })
              const rosterSeason = await Season.findOne({ fromYear: coach.SEASON })

              // use uid for apiCode if it doesn't exist
              const teamRosterCoach = {
                apiCode: coach.COACH_ID && coach.TEAM_ID ? coach.TEAM_ID + '-' + coach.COACH_ID : null,
                team: team._id,
                firstname: coach.FIRST_NAME,
                lastname: coach.LAST_NAME,
                coachType: coachStaffRole?._id,
                level: coach.IS_ASSISTANT,
                season: [rosterSeason?._id],
                isActive: coach.IS_ACTIVE
              }

              // check if coach exists, if it does, update the coach with the new season
              const existingCoach = await Coach.findOne({ apiCode: teamRosterCoach.apiCode })
              if (existingCoach) {
                existingCoach.season.push(rosterSeason?._id)
                await Coach.findOneAndUpdate({ _id: existingCoach._id }, { $set: { season: existingCoach.season } })
              } else {
                const newCoach = await Coach.create(teamRosterCoach)

                const coachStaff = {
                  team: team._id,
                  season: rosterSeason?._id,
                  // headcoach should be created first then updated?, filter the coachtype?
                  headCoach: coachStaffRole?.role === 'Head Coach' ? newCoach._id : null,
                  // get the role types and push them to staff if they are not head coach
                  staff: coachStaffRole?.role !== 'Head Coach' ? [newCoach._id] : []
                }

                const newCoachStaff = await CoachStaff.create(coachStaff)
                // update the roster with the new coach staff
                for (const roster of team.rosterHistory) {
                  const newRoster = await Roster.findByIdAndUpdate(roster._id, { coachStaff: newCoachStaff._id }, { new: true })
                }

                count++
                goodlog.custom('brightGreen', String(count) + ` ${team.name} coach staff history created`)
              }
            }
            res.status(CODE.OK).send(RESPONSE.UPDATED_ALL)
          } catch (error: any) {
            goodlog.error(error)
            res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
          }
        }
      }
    } catch (error: any) {
      goodlog.error(error, TAG, ' updateCoachHistory ')
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }
}

export default SDKSetController
