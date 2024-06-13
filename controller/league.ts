import { Request, Response, NextFunction } from 'express'
import { League } from 'model'
import axios from 'axios'
import goodlog from 'good-logs'
import { SDK_DIR } from 'config/sdk-dir'
import { CODE, KEY, MESSAGE, RESPONSE, QPARAM } from 'constant'

class LeagueController {
  public static async createLeague(req: Request, res: Response, next: NextFunction) {
    try {
      const { apiCode, league, commissioner, founded, teams, headquarters, website, logo } = req.body

      const leagueExists = await League.findOne({ apiCode })
      if (leagueExists) {
        return res.status(CODE.CONFLICT).send(RESPONSE.CONFLICT('League already exists'))
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
        return res.status(CODE.BAD_REQUEST).send(RESPONSE.BAD_REQUEST('Failed to create league'))
      }
      res.status(CODE.CREATED).send(RESPONSE.CREATED(newLeague))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(error.message))
    }
  }
}

export default LeagueController
