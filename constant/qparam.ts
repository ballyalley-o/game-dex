import { TEAM_ID } from './team-id'

export const SCOPE = {
  S: 'S'
}

export const SEASON_TYPE_ALL_STAR = {
  REGULAR: 'Regular Season',
  PLAYOFF: 'Playoff',
  FINALS: 'Finals',
  ALLSTAR: 'AllStar',
  PRESEASON: 'PreSeason',
  SUMMER: 'Summer League'
}

export const STAT_CATEGORY_ABBV = {
  PTS: 'PTS',
  AST: 'AST',
  REB: 'REB',
  STL: 'STL',
  BLK: 'BLK',
  TO: 'TO',
  PF: 'PF',
  FG3M: 'FG3M',
  FG3A: 'FG3A',
  FG3_PCT: 'FG3_PCT',
  FG_PCT: 'FG_PCT',
  FT_PCT: 'FT_PCT'
}

export const FRANCHISE_LEADER = {
  TEAM_ID: TEAM_ID,
  LEAGUE_ID_NULLABLE: '00'
}

export const PLAYER_OR_TEAM = {
  PLAYER: 'Player',
  TEAM: 'Team'
}

export const PER_MODE = {
  PER_GAME: 'PerGame',
  PER_36: 'Per36',
  TOTAL: 'Totals'
}

export const ALL_TIME_LEADER_GRID = {
  LEAGUE_ID: '00',
  PER_MODE: PER_MODE,
  SEASON_TYPE: SEASON_TYPE_ALL_STAR,
  TOP_X: 10
}

export const QPARAM = {
  ...FRANCHISE_LEADER,
  ...PLAYER_OR_TEAM,
  ...SCOPE,
  ...SEASON_TYPE_ALL_STAR,
  ...STAT_CATEGORY_ABBV
}
