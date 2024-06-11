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

export const LEAGUE_ID = {
  nba: '00',
  aba: '01',
  wnba: '10',
  g_league: '20'
}

export const PERIOD = {
  ALL: '0',
  Q1: '1',
  Q2: '2',
  Q3: '3',
  Q4: '4',
  OT: '5'
}

export const OUTCOME = {
  WIN: 'W',
  LOSS: 'L'
}

export const PER_MODE_SIMPLE = {
  PER_GAME: 'PerGame',
  TOTAL: 'Totals'
}

export const PER_MODE_36 = {
  PER_36: 'Per36'
}

export const PER_MODE_48 = {
  PER_48: 'Per48'
}

export const PER_MODE_TIME = {
  PER_MINUTE: 'MinutesPer',
  PER_40: 'Per40'
}

export const PER_MODE_DETAILED = {
  PER_MINUTE: 'MinutesPer',
  PER_POSSESSION: 'PerPossession',
  PER_PLAY: 'PerPlay',
  PER_100: 'Per100Possessions',
  PER_100_PLAY: 'Per100Plays'
}

export const PER = {
  ...{ PER_MODE_SIMPLE },
  ...{ PER_MODE_36 },
  ...{ PER_MODE_48 },
  ...{ PER_MODE_TIME }
}

export const PLAYER_EXPERIENCE = {
  ROOKIE: 'Rookie',
  SOPHOMORE: 'Sophomore',
  VETERAN: 'Veteran'
}

export const PLAYER_POSITION = {
  GUARD: 'Guard',
  FORWARD: 'Forward',
  CENTER: 'Center'
}

export const PLAYER_POSITION_ABBV = {
  G: 'G',
  F: 'F',
  C: 'C',
  C_F: 'C-F',
  F_C: 'F-C',
  F_G: 'F-G',
  G_F: 'G-F'
}

export const CLUTCH_TIME = {
  LAST_5_MINUTES: 'Last 5 Minutes',
  LAST_3_MINUTES: 'Last 3 Minutes',
  LAST_1_MINUTE: 'Last 1 Minute',
  LAST_30_SECONDS: 'Last 30 Seconds',
  LAST_10_SECONDS: 'Last 10 Seconds'
}

export const QPARAM = {
  ...CLUTCH_TIME,
  ...PER,
  ...PLAYER_EXPERIENCE,
  ...PLAYER_POSITION,
  ...PLAYER_POSITION_ABBV,
  ...OUTCOME,
  ...PERIOD,
  ...LEAGUE_ID,
  ...ALL_TIME_LEADER_GRID,
  ...FRANCHISE_LEADER,
  ...PLAYER_OR_TEAM,
  ...SCOPE,
  ...SEASON_TYPE_ALL_STAR,
  ...STAT_CATEGORY_ABBV
}
