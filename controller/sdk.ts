import { Request, Response, NextFunction } from 'express'
import { spawn } from 'child_process'
import axios from 'axios'
import goodlog from 'good-logs'
import { SDK_DIR } from 'config/sdk-dir'
import { CODE, KEY, MESSAGE, RESPONSE, QPARAM } from 'constant'

/**
 * The SDKController class provides methods for interacting with the NBA API.
 *
 * @path {base_sdk_url}/sdk
 */
class SDKController {
  private static _playerId: string
  private static _teamId: string
  private static _teamAbbv: string
  private static _teamState: string

  static setPlayerId(req: Request) {
    this._playerId = req.params.id
  }

  static setTeamId(req: Request) {
    this._teamId = req.params.id
  }

  static setTeamAbbv(req: Request) {
    this._teamAbbv = req.params.abbv
  }

  static setTeamState(req: Request) {
    this._teamState = req.params.state
  }

  static setQueryParams(req: Request) {
    const { scope, season, season_type_all_star, stat_category_abbreviation } = req.query

    return {
      scope,
      season,
      season_type_all_star,
      stat_category_abbreviation
    }
  }

  static setQueryParamsFranchise(req: Request) {
    const { team_id, league_id_nullable } = req.query

    return {
      team_id,
      league_id_nullable
    }
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
      SDKController.setTeamId(req)

      if (!SDKController._teamId) {
        res.status(CODE.UNPROCESSABLE_ENTITY).send(RESPONSE.UNPROCESSABLE_ENTITY(MESSAGE.NO_ID))
      } else {
        const teams = await axios.get(SDK_DIR.TEAM_INFO(SDKController._teamId))

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
  public static async getTeamByAbbv(req: Request, res: Response, _next: NextFunction) {
    try {
      SDKController.setTeamAbbv(req)

      if (!SDKController._teamAbbv) {
        res.status(CODE.UNPROCESSABLE_ENTITY).send(RESPONSE.UNPROCESSABLE_ENTITY(MESSAGE.NO_ABBV))
      } else {
        const team = await axios.get(SDK_DIR.TEAM_FIND(SDKController._teamAbbv))

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

  /**
   * Retrieves all teams by state.
   *
   * @route   {GET} /sdk/team/state/:_teamState
   * @access  public
   */
  public static async getAllTeamByState(req: Request, res: Response, _next: NextFunction) {
    try {
      const stateId = req.params.state

      if (!stateId) {
        res.status(CODE.UNPROCESSABLE_ENTITY).send(RESPONSE.UNPROCESSABLE_ENTITY(MESSAGE.NO_STATE))
      } else {
        const state = await axios.get(SDK_DIR.TEAM_STATE(stateId))

        if (!state.data) {
          res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
        } else {
          res.status(CODE.OK).send(RESPONSE.OK(state.data))
        }
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  /**
   * Retrieves all players
   *
   * @route   {GET} /sdk/player
   * @access  public
   */
  public static async getAllPlayer(_req: Request, res: Response, _next: NextFunction) {
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

  /**
   * Retrieves information about a specific player.
   *
   * @route   {GET} /sdk/player/:_playerId
   * @access  public
   */
  public static async getPlayer(req: Request, res: Response, _next: NextFunction) {
    try {
      SDKController.setPlayerId(req)

      if (!SDKController._playerId) {
        res.status(CODE.UNPROCESSABLE_ENTITY).send(RESPONSE.UNPROCESSABLE_ENTITY(MESSAGE.NO_ID))
      } else {
        const player = await axios.get(SDK_DIR.PLAYER_INFO(SDKController._playerId))

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

  /**
   * Retrieves information about a specific player's awards.
   *
   * @route   {GET} /sdk/player/:_playerId/award
   * @access  public
   */
  public static async getPlayerAward(req: Request, res: Response, _next: NextFunction) {
    try {
      SDKController.setPlayerId(req)

      if (!SDKController._playerId) {
        res.status(CODE.UNPROCESSABLE_ENTITY).send(RESPONSE.UNPROCESSABLE_ENTITY(MESSAGE.NO_ID))
      } else {
        const playerAward = await axios.get(SDK_DIR.PLAYER_AWARD(SDKController._playerId))

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

  /**
   * Retrieves information about a specific player's career.
   *
   * @route   {GET} /sdk/player/:_playerId/career
   * @access  public
   * **/
  public static async getPlayerCareer(req: Request, res: Response, _next: NextFunction) {
    try {
      SDKController.setPlayerId(req)

      if (!SDKController._playerId) {
        res.status(CODE.UNPROCESSABLE_ENTITY).send(RESPONSE.UNPROCESSABLE_ENTITY(MESSAGE.NO_ID))
      } else {
        const playerCareer = await axios.get(SDK_DIR.PLAYER_CAREER(SDKController._playerId))

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

  /**
   * Retrieves the draft history.
   *
   * @route   {GET} /sdk/draft/history
   * @access  public
   * **/
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

  // current leader module

  /**
   * Retrieves all currrent league leader players.
   *
   * @route   {GET} /sdk/leader
   * @access  public
   * **/
  public static async getAllLeader(req: Request, res: Response, _next: NextFunction) {
    try {
      const { scope, season, season_type_all_star, stat_category_abbreviation } = SDKController.setQueryParams(req)
      const leaderAll = await axios.get(SDK_DIR.LEADER_ALL, {
        params: {
          scope,
          season,
          season_type_all_star,
          stat_category_abbreviation
        }
      })

      if (!leaderAll.data) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
      } else {
        res.status(CODE.OK).send(RESPONSE.OK(leaderAll.data))
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  /**
   * Retrieves the current leader in points.
   *
   * @route   {GET} /sdk/leader/pt
   * @access  public
   * **/
  public static async getLeaderPtTeam(_req: Request, res: Response, _next: NextFunction) {
    try {
      const leaderPtTeam = await axios.get(SDK_DIR.LEADER_PT)

      if (!leaderPtTeam.data) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
      } else {
        res.status(CODE.OK).send(RESPONSE.OK(leaderPtTeam.data))
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  /**
   * Retrieves the current leader in points.
   *
   * @route   {GET} /sdk/leader/pt/player
   * @access  public
   * **/
  public static async getLeaderPtPlayer(_req: Request, res: Response, _next: NextFunction) {
    try {
      const leaderAstPlayer = await axios.get(SDK_DIR.LEADER_PT, {
        params: {
          player_or_team: QPARAM.PLAYER
        }
      })

      if (!leaderAstPlayer.data) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
      } else {
        res.status(CODE.OK).send(RESPONSE.OK(leaderAstPlayer.data))
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  /**
   * Retrieves  the current leader in assist (Team).
   *
   * @route   {GET} /sdk/leader/ast
   * @access  public
   * **/
  public static async getLeaderAstTeam(_req: Request, res: Response, _next: NextFunction) {
    try {
      const leaderAstTeam = await axios.get(SDK_DIR.LEADER_AST)

      if (!leaderAstTeam.data) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
      } else {
        res.status(CODE.OK).send(RESPONSE.OK(leaderAstTeam.data))
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  /**
   * Retrieves the current leader in assist (Player).
   *
   * @route   {GET} /sdk/leader/ast/player
   * @access  public
   * **/
  public static async getLeaderAstPlayer(_req: Request, res: Response, _next: NextFunction) {
    try {
      const leaderAstPlayer = await axios.get(SDK_DIR.LEADER_AST, {
        params: {
          player_or_team: QPARAM.PLAYER
        }
      })

      if (!leaderAstPlayer.data) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
      } else {
        res.status(CODE.OK).send(RESPONSE.OK(leaderAstPlayer.data))
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  /**
   * Retrieves all all-time leaders in each category.
   *
   * @route   {GET} /sdk/all-time/leader
   * @access  public
   * **/
  public static async getAllTimeLeader(_req: Request, res: Response, _next: NextFunction) {
    try {
      const allTimeLeader = await axios.get(SDK_DIR.ALL_TIME_LEADER)

      if (!allTimeLeader.data) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
      } else {
        res.status(CODE.OK).send(RESPONSE.OK(allTimeLeader.data))
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  /**
   * Retrieves the all-time leader in per Totals.
   *
   * @route   {GET} /sdk/all-time/total
   * @access  public
   * **/
  public static async getAllTimeTotal(_req: Request, res: Response, _next: NextFunction) {
    try {
      const allTimeTotal = await axios.get(SDK_DIR.ALL_TIME_TOTAL)

      if (!allTimeTotal.data) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
      } else {
        res.status(CODE.OK).send(RESPONSE.OK(allTimeTotal.data))
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  // franchise module

  /**
   * Retrieves all franchise leaders.
   *
   * @route   {GET} /sdk/franchise/leader
   * @access  public
   * **/
  public static async getAllFranchiseLeader(req: Request, res: Response, _next: NextFunction) {
    SDKController.setQueryParamsFranchise(req)
    try {
      const { team_id, league_id_nullable } = SDKController.setQueryParamsFranchise(req)

      const franchiseLeader = await axios.get(SDK_DIR.FRANCHISE_LEADER, {
        params: {
          team_id,
          league_id_nullable
        }
      })

      if (!franchiseLeader.data) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
      } else {
        res.status(CODE.OK).send(RESPONSE.OK(franchiseLeader.data))
      }
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  // scoreboard module

  /**
   * Retrieves the scoreboard for the latest games.
   *
   * @route   {GET} /sdk/scoreboard
   * @access  public
   * **/
  public static async getScoreboard(_req: Request, res: Response, _next: NextFunction) {
    try {
      const scoreboard = await axios.get(SDK_DIR.SCOREBOARD)

      if (!scoreboard.data) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
      } else {
        res.status(CODE.OK).send(RESPONSE.OK(scoreboard.data))
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
