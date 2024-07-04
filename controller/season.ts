import 'colors'
import { Request, Response, NextFunction } from 'express'
import goodlog from 'good-logs'
import { Season } from 'model'
import { TAGS, RESPONSE, CODE, MESSAGE } from 'constant'

const TAG = TAGS.SEASON_CONTROLLER

class SeasonController {
  public static async getAllSeason(req: Request, res: Response, next: NextFunction) {
    try {
      const seasons = await Season.find()
      res.status(CODE.OK).json(RESPONSE.OK(seasons, seasons.length))
    } catch (error: any) {
      goodlog.error(error, TAG, 'getAllSeason'.bgYellow)
      res.status(CODE.INTERNAL_SERVER_ERROR).json(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }

  public static async getSeason(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const season = await Season.findById(id)
      if (!season) {
        return res.status(CODE.NOT_FOUND).json(RESPONSE.NOT_FOUND)
      }
      res.status(CODE.OK).json(RESPONSE.OK(season))
    } catch (error: any) {
      goodlog.error(error, TAG, 'getSeason'.bgYellow)
      res.status(CODE.INTERNAL_SERVER_ERROR).json(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }

  public static async createAllNBASeason(_req: Request, res: Response, next: NextFunction) {
    try {
      const seasons = []

      const currentYear = new Date().getFullYear()

      for (let year = 1946; year <= currentYear; year++) {
        const season = new Season({
          fromYear: year,
          toYear: year + 1,
          status: new Date().getFullYear() === year ? (new Date().getMonth() < 9 ? 'upcoming' : 'in progress') : 'completed'
        })
        seasons.push(season)
      }

      await Season.insertMany(seasons)
      goodlog.custom('brightGreen', String(seasons.length) + ' seasons created')
      res.status(CODE.CREATED).send(RESPONSE.CREATED_ALL)
    } catch (error: any) {
      goodlog.error(error, TAG, 'createAllNBASeason')
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR(MESSAGE.FAILED_CREATE))
    }
  }

  public static async createSeason(req: Request, res: Response, next: NextFunction) {
    try {
      const { apiCode, fromYear, toYear } = req.body
      const season = new Season({
        apiCode,
        fromYear,
        toYear
      })
      await season.save()

      res.status(CODE.CREATED).json(RESPONSE.CREATED)
    } catch (error: any) {
      goodlog.error(error, TAG, 'createSeason'.bgYellow)
      res.status(CODE.INTERNAL_SERVER_ERROR).json(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }

  public static async updateSeason(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { apiCode, fromYear, toYear } = req.body
      const season = await Season.findById(id)
      if (!season) {
        return res.status(CODE.NOT_FOUND).json(RESPONSE.NOT_FOUND)
      }

      season.apiCode = apiCode
      season.fromYear = fromYear
      season.toYear = toYear
      //   TODO: fetch teams, games, players, stats, leaders, awards, hof, notableEvents

      await season.save()

      res.status(CODE.OK).json(RESPONSE.OK(season))
    } catch (error: any) {
      goodlog.error(error, TAG, 'updateSeason'.bgYellow)
      res.status(CODE.INTERNAL_SERVER_ERROR).json(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }

  public static async deleteSeason(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const season = await Season.findByIdAndDelete(id)
      if (!season) {
        return res.status(CODE.NOT_FOUND).json(RESPONSE.NOT_FOUND)
      }

      res.status(CODE.NO_CONTENT).json(RESPONSE.NO_CONTENT)
    } catch (error: any) {
      goodlog.error(error, TAG, 'deleteSeason'.bgYellow)
      res.status(CODE.INTERNAL_SERVER_ERROR).json(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }
}

export default SeasonController
