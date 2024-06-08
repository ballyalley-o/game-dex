import { conNexSegment } from 'lib'
import { GLOBAL } from 'config/global'
import { SEGMENT } from 'constant'

/**
 * The directory paths for different segments of the API.
 */
export const PATH_DIR = {
  /**
   * The directory path for the API segment.
   * @route /api/v1
   */
  API: conNexSegment(SEGMENT.API, GLOBAL.API_VERSION),

  /**
   * The directory path for the SDK segment.
   * @route /api/v1/sdk
   */
  SDK: conNexSegment(SEGMENT.API, GLOBAL.API_VERSION, SEGMENT.SDK)
}

/**
 * The directory path for the SDK segment.
 * @route /api/v1/sdk
 */
export const PATH_SDK = {
  /**
   * The root directory path.
   * @route /api/v1/sdk
   */
  ROOT: conNexSegment(SEGMENT.SDK),

  /**
   * The team all directory path.
   * @route /team
   */
  TEAM: conNexSegment(SEGMENT.TEAM),

  /**
   * Returns the team info directory path for the specified team ID.
   * @route /team/{id}
   * @param id - The team ID.
   * @returns The team info directory path.
   */
  TEAM_ID: conNexSegment(SEGMENT.TEAM, SEGMENT.ID),

  /**
   * Returns the team find directory path for the specified team ID.
   * @route /team/find/{abbv}
   * @param id - The team ID.
   * @returns The team find directory path.
   */
  TEAM_ABBV: conNexSegment(SEGMENT.TEAM, SEGMENT.ABBV, SEGMENT.ABBV_PARAM),

  /**
   * The player all directory path.
   * @route /player
   */
  PLAYER: conNexSegment(SEGMENT.PLAYER),

  /**
   * Returns the player info directory path for the specified player ID.
   * @route /player/{id}
   * @param id - The player ID.
   * @returns The player info directory path.
   */
  PLAYER_ID: conNexSegment(SEGMENT.PLAYER, SEGMENT.ID),

  /**
   * Returns the player award directory path for the specified player ID.
   * @route /player/award/{id}
   * @param id - The player ID.
   * @returns The player find directory path.
   */
  PLAYER_AWARD: conNexSegment(SEGMENT.PLAYER, SEGMENT.AWARD, SEGMENT.ID),

  /**
   * Returns the player career directory path for the specified player ID.
   * @route /player/career/{id}
   * @param id - The player ID.
   * @returns The player career directory path.
   */
  PLAYER_CAREER: conNexSegment(SEGMENT.PLAYER, SEGMENT.CAREER, SEGMENT.ID),

  /**
   * The draft history directory path.
   * @route /draft/history
   */
  DRAFT_HISTORY: conNexSegment(SEGMENT.DRAFT, SEGMENT.HISTORY)
}
