import { Request, Response } from 'express'
import goodlog from 'good-logs'
import { Team } from 'model'
import { RESPONSE, CODE } from 'constant'

class TeamController {
  private static _teamId: string

  static setTeamId(req: Request): void {
    this._teamId = req.params.id
  }

  public static async getAllTeam(_req: Request, res: Response): Promise<void> {
    try {
      const teams = await Team.find().populate('stats', {
        _id: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0
      })

      if (!teams) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND)
        return
      }
      res.status(200).send(RESPONSE.OK(teams, teams.length))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }

  public static async getTeamById(req: Request, res: Response): Promise<void> {
    try {
      TeamController.setTeamId(req)

      const team = await Team.findById(TeamController._teamId)
        .populate({
          path: 'stats',
          populate: {
            path: 'regularSeasonStats'
          }
        })
        .lean()

      if (!team) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND)
        return
      }
      res.status(200).send(RESPONSE.OK(team))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }
}

export default TeamController
