import { Request, Response, NextFunction } from 'express'
import { League } from 'model'
import goodlog from 'good-logs'
import { CODE, KEY, MESSAGE, RESPONSE, QPARAM } from 'constant'

class LeagueController {
  public static async getAllLeague(req: Request, res: Response, next: NextFunction) {
    try {
      const leagues = await League.find()
      if (!leagues) {
        return res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
      }
      res.status(CODE.OK).send(RESPONSE.OK(leagues))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  public static async getLeagueById(req: Request, res: Response, next: NextFunction) {
    try {
      const league = await League.findOne({ _id: req.params.id })
      if (!league) {
        return res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
      }
      res.status(CODE.OK).send(RESPONSE.OK(league))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  public static async createLeague(req: Request, res: Response, next: NextFunction) {
    try {
      const { apiCode, league, commissioner, founded, teams, headquarters, website, logo } = req.body

      const leagueExists = await League.findOne({ apiCode })
      if (leagueExists) {
        return res.status(CODE.CONFLICT).send(RESPONSE.CONFLICT(MESSAGE.ALREADY_EXISTS))
      }

      const leagueData = {
        apiCode,
        league,
        commissioner,
        founded,
        teams,
        headquarters,
        website,
        logo
      }

      const newLeague = await League.create(leagueData)

      if (!newLeague) {
        return res.status(CODE.BAD_REQUEST).send(RESPONSE.BAD_REQUEST(MESSAGE.FAILED_CREATE))
      }
      res.status(CODE.CREATED).send(RESPONSE.CREATED(newLeague))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  public static async updateLeague(req: Request, res: Response, next: NextFunction) {
    try {
      const { apiCode } = req.params
      const leagueData = req.body

      const league = await League.findOneAndUpdate({ apiCode }, leagueData, { new: true })

      if (!league) {
        return res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
      }
      res.status(CODE.OK).send(RESPONSE.OK(league))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }

  public static async deleteLeague(req: Request, res: Response, next: NextFunction) {
    try {
      const { apiCode } = req.params

      const league = await League.findOneAndDelete({ apiCode })

      if (!league) {
        return res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND(MESSAGE.NOT_FOUND))
      }
      res.status(CODE.OK).send(RESPONSE.OK(league))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }
}

export default LeagueController
