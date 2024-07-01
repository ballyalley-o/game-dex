import { Request, Response, NextFunction } from 'express'
import goodlog from 'good-logs'
import { League, Player } from 'model'
import { SDKController } from 'controller'
import { CODE, MESSAGE, QPARAM, RESPONSE } from 'constant'

class PlayerController {
  private static _playerId: string

  static setPlayerId(req: Request) {
    this._playerId = req.params.id
  }

  public static playerLeagues = (isNba: string, nba: any, isGLeague: string, gLeague: any) => {
    const leagues = [] as League[]
    if (isNba === 'Y') {
      leagues.includes(nba[0]._id) ? leagues : leagues.push(nba[0]._id)
    }
    if (isGLeague === 'Y') {
      leagues.includes(gLeague[0]._id) ? leagues : leagues.push(gLeague[0]._id)
    }
    return leagues
  }

  /**
   * Retrieves all players from the database.
   *
   */
  public static async getAllPlayer(_req: Request, res: Response, _next: NextFunction) {
    try {
      const players = await Player.find()

      if (!players) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND)
        return
      }

      res.status(CODE.OK).send(RESPONSE.OK(players, players.length))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Retrieves a player by their ID.
   *
   * @param id - The id object.
   */
  public static async getPlayerById(req: Request, res: Response, _next: NextFunction) {
    PlayerController.setPlayerId(req)
    try {
      const player = await Player.findById(PlayerController._playerId)

      if (!player) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND)
        return
      }

      res.status(CODE.OK).send(RESPONSE.OK(player))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Updates all players in the database.
   *
   * @returns A Promise that resolves to the updated player.
   */
  public static async updateAllPlayer(_req: Request, res: Response, _next: NextFunction) {
    try {
      const allPlayer = await Player.find()
      let updatedPlayers
      let count = 0

      if (!allPlayer) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND)
        return
      }

      for (const player of allPlayer) {
        const playerInfo = await SDKController.getPlayerByApiCode(player.apiCode)
        const playerCommonInfo = playerInfo.CommonPlayerInfo[0]
        const playerHeadlineStats = playerInfo.PlayerHeadlineStats[0]

        if (!playerInfo) {
          res.status(CODE.BAD_REQUEST).send(RESPONSE.BAD_REQUEST(MESSAGE.NOT_FOUND))
          return
        }
        const nba = await League.find({ apiCode: QPARAM.nba })
        const gLeague = await League.find({ apiCode: QPARAM.g_league })

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

        const update = {} as Player

        if (playerCommonInfo.BIRTHDATE) update.birthDate = playerCommonInfo.BIRTHDATE
        if (playerCommonInfo.SCHOOL) update.school = playerCommonInfo.SCHOOL
        if (playerCommonInfo.COUNTRY) update.nationality = playerCommonInfo.COUNTRY
        if (playerCommonInfo.HEIGHT) update.height = playerCommonInfo.HEIGHT
        if (playerCommonInfo.WEIGHT) update.weight = playerCommonInfo.WEIGHT
        if (playerCommonInfo.POSITION) {
          update.position = player.position
            ? player.position.includes(playerCommonInfo.POSITION)
              ? [...player.position]
              : [...player.position, playerCommonInfo.POSITION]
            : [playerCommonInfo.POSITION]
        }
        if (playerCommonInfo.PLAYER_SLUG) {
          update.slug = player.slug
            ? player.slug.includes(playerCommonInfo.PLAYER_SLUG)
              ? [...player.slug]
              : [...player.slug, playerCommonInfo.PLAYER_SLUG]
            : [playerCommonInfo.PLAYER_SLUG]
        }
        if (playerCommonInfo.FROM_YEAR) update.fromYear = playerCommonInfo.FROM_YEAR
        if (playerCommonInfo.TO_YEAR) update.toYear = playerCommonInfo.TO_YEAR
        if (playerInfo.PlayerHeadlineStats && playerHeadlineStats) update.headlineStats = headlineStats(playerHeadlineStats)
        if (playerCommonInfo.NBA_FLAG !== undefined && playerCommonInfo.DLEAGUE_FLAG !== undefined) {
          update.leagues = PlayerController.playerLeagues(playerCommonInfo.NBA_FLAG, nba, playerCommonInfo.DLEAGUE_FLAG, gLeague)
        }
        update.isActive = playerCommonInfo.ROSTERSTATUS === 'Inactive' ? false : true
        update.isGreatest75 = playerCommonInfo.GREATEST_75_FLAG === 'Y' ? true : false

        updatedPlayers = await Player.findByIdAndUpdate(player._id, update, { new: true })

        count++
        goodlog.custom('brightGreen', `[${count}] Updated player: ${playerCommonInfo.DISPLAY_LAST_COMMA_FIRST} with ID: ${update.apiCode}`)
      }

      res.status(CODE.OK).send(RESPONSE.OK(MESSAGE.CREATED_ALL, count))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Updates all players in the database.
   *
   * @returns A Promise that resolves to the updated player.
   */
  public static async updatePlayerById(req: Request, res: Response, _next: NextFunction) {
    PlayerController.setPlayerId(req)
    try {
      const player = await Player.findById(PlayerController._playerId)

      if (!player) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND)
        return
      }

      const playerInfo = await SDKController.getPlayerByApiCode(player.apiCode)
      if (!playerInfo) {
        res.status(CODE.BAD_REQUEST).send(RESPONSE.BAD_REQUEST(MESSAGE.NOT_FOUND))
        return
      }
      const playerCommonInfo = playerInfo.CommonPlayerInfo[0]
      const playerHeadlineStats = playerInfo.PlayerHeadlineStats[0]

      const nba = await League.find({ apiCode: QPARAM.nba })
      const gLeague = await League.find({ apiCode: QPARAM.g_league })

      // const playerLeagues = (isNba: string, isGLeague: string) => {
      //   const leagues = [] as League[]
      //   if (isNba === 'Y') {
      //     leagues.includes(nba[0]._id) ? leagues : leagues.push(nba[0]._id)
      //   }
      //   if (isGLeague === 'Y') {
      //     leagues.includes(gLeague[0]._id) ? leagues : leagues.push(gLeague[0]._id)
      //   }
      //   return leagues
      // }

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

      const update = {} as Player

      if (playerCommonInfo.BIRTHDATE) update.birthDate = playerCommonInfo.BIRTHDATE
      if (playerCommonInfo.SCHOOL) update.school = playerCommonInfo.SCHOOL
      if (playerCommonInfo.COUNTRY) update.nationality = playerCommonInfo.COUNTRY
      if (playerCommonInfo.HEIGHT) update.height = playerCommonInfo.HEIGHT
      if (playerCommonInfo.WEIGHT) update.weight = playerCommonInfo.WEIGHT
      if (playerCommonInfo.POSITION) {
        update.position = player.position
          ? player.position.includes(playerCommonInfo.POSITION)
            ? [...player.position]
            : [...player.position, playerCommonInfo.POSITION]
          : [playerCommonInfo.POSITION]
      }
      if (playerCommonInfo.PLAYER_SLUG) {
        update.slug = player.slug
          ? player.slug.includes(playerCommonInfo.PLAYER_SLUG)
            ? [...player.slug]
            : [...player.slug, playerCommonInfo.PLAYER_SLUG]
          : [playerCommonInfo.PLAYER_SLUG]
      }
      if (playerCommonInfo.FROM_YEAR) update.fromYear = playerCommonInfo.FROM_YEAR
      if (playerCommonInfo.TO_YEAR) update.toYear = playerCommonInfo.TO_YEAR
      if (playerInfo.PlayerHeadlineStats && playerHeadlineStats) update.headlineStats = headlineStats(playerHeadlineStats)
      if (playerCommonInfo.NBA_FLAG !== undefined && playerCommonInfo.DLEAGUE_FLAG !== undefined) {
        update.leagues = PlayerController.playerLeagues(playerCommonInfo.NBA_FLAG, nba, playerCommonInfo.DLEAGUE_FLAG, gLeague)
      }
      update.isActive = playerCommonInfo.ROSTERSTATUS === 'Inactive' ? false : true
      update.isGreatest75 = playerCommonInfo.GREATEST_75_FLAG === 'Y' ? true : false

      goodlog.custom('brightGreen', `Updated player: ${playerCommonInfo.DISPLAY_LAST_COMMA_FIRST} with ID: ${update.apiCode}`)

      const updatedPlayer = await Player.findByIdAndUpdate(player._id, update, { new: true })
      res.status(CODE.OK).send(RESPONSE.OK(updatedPlayer))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * Deletes a player by their ID.
   *
   */
  public static async deletePlayerById(req: Request, res: Response, _next: NextFunction) {
    try {
      const player = await Player.findByIdAndDelete(req.params.id)

      if (!player) {
        res.status(CODE.NOT_FOUND).send(RESPONSE.NOT_FOUND)
        return
      }

      res.status(CODE.OK).send(RESPONSE.OK({}))
    } catch (error: any) {
      goodlog.error(error)
      res.status(CODE.INTERNAL_SERVER_ERROR).send(RESPONSE.INTERNAL_SERVER_ERROR)
    }
  }
}

export default PlayerController
