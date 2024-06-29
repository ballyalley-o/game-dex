import { conNexSegment } from 'lib'
import { GLOBAL } from 'config/global'
import { FRANCHISE_LEADER, SEGMENT } from 'constant'

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
  SDK: conNexSegment(SEGMENT.API, GLOBAL.API_VERSION, SEGMENT.SDK),

  // Create

  /**
   * The league directory path.
   * @route /player
   */
  LEAGUE: conNexSegment(SEGMENT.API, GLOBAL.API_VERSION, SEGMENT.LEAGUE),

  /**
   * The team directory path.
   * @route /franchise
   */
  FRANCHISE: conNexSegment(SEGMENT.API, GLOBAL.API_VERSION, SEGMENT.FRANCHISE),

  /**
   * The team directory path.
   * @route /team
   */
  TEAM: conNexSegment(SEGMENT.API, GLOBAL.API_VERSION, SEGMENT.TEAM),

  /**
   * The team info directory path.
   * @route /team/{id}
   */
  TEAM_ID: conNexSegment(SEGMENT.ID),

  /**
   * The player directory path.
   * @route /player
   */
  PLAYER: conNexSegment(SEGMENT.API, GLOBAL.API_VERSION, SEGMENT.PLAYER),

  /**
   * The role directory path.
   * @route /api/v1/role
   */
  ROLE: conNexSegment(SEGMENT.API, GLOBAL.API_VERSION, SEGMENT.ROLE)
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
   * The team state directory path.
   * @route /team/state/{state}
   * @param state - The team state.
   * @returns The team state directory path.
   */
  TEAM_STATE: conNexSegment(SEGMENT.TEAM, SEGMENT.STATE, SEGMENT.STATE_PARAM),

  /**
   * Returns the team info directory path for the specified team ID.
   * @route /team/{id}
   * @param id - The team ID.
   * @returns The team info directory path.
   */
  TEAM_ID: conNexSegment(SEGMENT.TEAM, SEGMENT.ID),

  /**
   * Returns the team find directory path for the specified team ID.
   * @route /team/abbv/{abbv}
   * @param id - The team ID.
   * @returns The team find directory path.
   */
  TEAM_ABBV: conNexSegment(SEGMENT.TEAM, SEGMENT.ABBV, SEGMENT.ABBV_PARAM),

  /**
   * Returns the team roster directory path for the /team/abbv/:abbv
   * @route /team/abbv/:abbv
   * @param id - The team ID.
   * @returns The team roster directory path.
   */
  TEAM_ABBV_CALL: (abbv: any) => conNexSegment(SEGMENT.TEAM, SEGMENT.ABBV, abbv),

  /**
   * Returns the team roster directory path for the specified team ID.
   * @route /team/{abbv}/roster
   * @param id - The team ID.
   * @returns The team roster directory path.
   */
  TEAM_ROSTER: conNexSegment(SEGMENT.TEAM, SEGMENT.ABBV_PARAM, SEGMENT.ROSTER),

  /**
   * Returns the team yearly stats directory path for the specified team ID.
   * @route /team/{abbv}/yearly/stats
   * @param id - The team ID.
   * @returns The team yearly stats directory path.
   */
  TEAM_YEARLY_STATS: conNexSegment(SEGMENT.TEAM, SEGMENT.ABBV_PARAM, SEGMENT.YEARLY, SEGMENT.STATS),

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
   * @route /player/{id}/award
   * @param id - The player ID.
   * @returns The player find directory path.
   */
  PLAYER_AWARD: conNexSegment(SEGMENT.PLAYER, SEGMENT.ID, SEGMENT.AWARD),

  /**
   * Returns the player career directory path for the specified player ID.
   * @route /player/{id}/career
   * @param id - The player ID.
   * @returns The player career directory path.
   */
  PLAYER_CAREER: conNexSegment(SEGMENT.PLAYER, SEGMENT.ID, SEGMENT.CAREER),

  /**
   * The player fantasy directory path.
   * @route /player/{id}/fantasy
   * @param id - The player ID.
   * @returns The player fantasy directory path.
   */
  PLAYER_FANTASY: conNexSegment(SEGMENT.PLAYER, SEGMENT.ID, SEGMENT.FANTASY),

  /**
   * The player compare directory path.
   * @route /player/{player2Id}/vs/{player2Id}
   * @param id - The player ID.
   * @returns The player compare directory path.
   */
  PLAYER_VS_PLAYER: conNexSegment(SEGMENT.PLAYER, SEGMENT.PLAYER_1_ID, SEGMENT.VS, SEGMENT.PLAYER_2_ID),

  /**
   * The draft history directory path.
   * @route /draft/history
   */
  DRAFT_HISTORY: conNexSegment(SEGMENT.DRAFT, SEGMENT.HISTORY),

  /**
   * Get all currrent league leader players  directory path. (default: Team)
   * @route /leader
   **/
  LEADER_ALL: conNexSegment(SEGMENT.LEADER),

  /**
   * The player current leader in assist directory path
   * @route /leader/pt
   **/
  LEADER_PT: conNexSegment(SEGMENT.LEADER, SEGMENT.PT),

  /**
   * The player current leader in points directory path
   * @route /leader/pt/player
   **/
  LEADER_PT_PLAYER: conNexSegment(SEGMENT.LEADER, SEGMENT.PT, SEGMENT.PLAYER),

  /**
   * Get all currrent players leader in assist directory path. (default: Team)
   * @route /leader/ast
   **/
  LEADER_AST: conNexSegment(SEGMENT.LEADER, SEGMENT.AST),

  /**
   * Get all currrent players leader in assist directory path. (default: Team)
   * @route /leader/ast/player
   **/
  LEADER_AST_PLAYER: conNexSegment(SEGMENT.LEADER, SEGMENT.AST, SEGMENT.PLAYER),

  /**
   * All time league leader directory path.
   * @route /all-time/leader
   */
  ALL_TIME_LEADER: conNexSegment(SEGMENT.ALL_TIME, SEGMENT.LEADER),

  /**
   * The player all time points directory path.
   * @route /all-time/total
   **/
  ALL_TIME_TOTAL: conNexSegment(SEGMENT.ALL_TIME, SEGMENT.TOTAL),

  /**
   * The franchise leader directory path.
   * @route /franchise/leader
   */
  FRANCHISE: conNexSegment(SEGMENT.FRANCHISE),

  /**
   * The franchise leader by team-id directory path.
   * @route /franchise/leader
   **/
  FRANCHISE_LEADER: conNexSegment(SEGMENT.FRANCHISE, SEGMENT.LEADER),

  /**
   * The franchise player by team_id directory path.
   * @route /franchise/leader/player
   **/
  FRANCHISE_PLAYER: conNexSegment(SEGMENT.FRANCHISE, SEGMENT.PLAYER),

  /**
   * The franchise history directory path.
   * @route /franchise/history
   */
  FRANCHISE_HISTORY: conNexSegment(SEGMENT.FRANCHISE, SEGMENT.HISTORY),

  /**
   * The rotation directory path.
   * @route /rotation
   */
  ROTATION: conNexSegment(SEGMENT.ROTATION),

  /**
   * The player all directory path.
   * @route /common/all/player
   */
  COMMON_ALL_PLAYER: conNexSegment(SEGMENT.COMMON, SEGMENT.ALL, SEGMENT.PLAYER),

  /**
   * The game finder directory path.
   * @route /game
   */
  GAME_FINDER: conNexSegment(SEGMENT.GAME),

  /**
   * The synergy playtype directory path.
   * @route /synergy/pt
   */
  SYNERGY_PT: conNexSegment(SEGMENT.SYNERGY, SEGMENT.PT),

  /**
   * The league matchups directory path.
   * @route /league/matchups
   */
  LEAGUE_MATCHUPS: conNexSegment(SEGMENT.LEAGUE, SEGMENT.MATCHUPS),

  /**
   * The player compare directory path.
   * @route /compare
   */
  COMPARE: conNexSegment(SEGMENT.COMPARE),

  /**
   * The scoreboard directory path.
   * @route /scoreboard
   */
  SCOREBOARD: conNexSegment(SEGMENT.SCOREBOARD)
}
