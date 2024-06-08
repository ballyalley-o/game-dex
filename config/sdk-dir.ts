import { conNex } from 'lib'
import { GLOBAL } from 'config/global'
import { SEGMENT } from 'constant'

/**
 * Represents the SDK directory paths.
 */
export const SDK_DIR = {
  /**
   * The root directory path.
   */
  ROOT: conNex(GLOBAL.SDK_URL, SEGMENT.SDK),

  /**
   * The team all directory path.
   * {base_url}/sdk/team
   */
  TEAM_ALL: conNex(GLOBAL.SDK_URL, SEGMENT.TEAM),

  /**
   * Returns the team info directory path for the specified team ID.
   *
   * {base_url}/sdk/team/info/{id}
   *
   * @param id - The team ID.
   * @returns The team info directory path.
   */
  TEAM_INFO: (id: any) => conNex(GLOBAL.SDK_URL, SEGMENT.TEAM, SEGMENT.INFO, id),

  /**
   * Returns the team find directory path for the specified team ID.
   *
   * {base_url}/sdk/team/find/{id}
   *
   * @param id - The team ID.
   * @returns The team find directory path.
   */
  TEAM_FIND: (id: any) => conNex(GLOBAL.SDK_URL, SEGMENT.TEAM, SEGMENT.FIND, id),

  /**
   * The player all directory path.
   *
   * {base_url}/sdk/player
   */
  PLAYER_ALL: conNex(GLOBAL.SDK_URL, SEGMENT.PLAYER),

  /**
   * Returns the player info directory path for the specified player ID.
   *
   * {base_url}/sdk/player/info/{id}
   *
   * @param id - The player ID.
   * @returns The player info directory path.
   */
  PLAYER_INFO: (id: any) => conNex(GLOBAL.SDK_URL, SEGMENT.PLAYER, SEGMENT.INFO, id),

  /**
   * The draft directory path.
   *
   * {base_url}/sdk/draft
   */
  DRAFT: conNex(GLOBAL.SDK_URL, SEGMENT.DRAFT),

  /**
   * The draft history directory path.
   *
   * {base_url}/sdk/draft/history
   */
  DRAFT_HISTORY: conNex(GLOBAL.SDK_URL, SEGMENT.DRAFT, SEGMENT.HISTORY)
}
