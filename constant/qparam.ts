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

export const PLAYER_OR_TEAM = {
  PLAYER: 'Player',
  TEAM: 'Team'
}

export const QPARAM = {
  ...PLAYER_OR_TEAM,
  ...SCOPE,
  ...SEASON_TYPE_ALL_STAR,
  ...STAT_CATEGORY_ABBV
}
