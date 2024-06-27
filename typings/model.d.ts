declare global {
  namespace Mongoose {
    interface Schema {
      Types: {
        ObjectId: any
      }
    }
  }
}

declare interface AllTimeLeaderBoard {
  _id: Schema.Types.ObjectId
  apiCode: string
  statCategories: Schema.Types.ObjectId[]
}

declare interface AllTimePointsLeaders {
  _id: Schema.Types.ObjectId
  apiCode: string
  players: Schema.Types.ObjectId[]
  points: number[]
  rank: number
  [key: string]: any
}

declare interface AllTimeAssistLeaders {
  _id: Schema.Types.ObjectId
  apiCode: string
  players: Schema.Types.ObjectId[]
  assists: number[]
  rank: number
  [key: string]: any
}

declare interface AllTimeReboundLeaders {
  _id: Schema.Types.ObjectId
  apiCode: string
  players: Schema.Types.ObjectId[]
  rebounds: number[]
  rank: number
  [key: string]: any
}

declare interface Game {
  _id: Schema.Types.ObjectId
  apiCode: string
  date: Date
  season: Schema.Types.ObjectId
  homeTeam: Schema.Types.ObjectId
  awayTeam: Schema.Types.ObjectId
  homeScore: number
  awayScore: number
  winner: Schema.Types.ObjectId
  stats: Schema.Types.ObjectId
  [key: string]: any
}

declare interface League {
  _id: Schema.Types.ObjectId
  apiCode: string
  league: string
  commissioner: string
  abbv: string
  founded: string
  teams: Schema.Types.ObjectId[]
  noOfTeams: number
  headquarters: string
  website: string
  logo: string
  [key: string]: any
}

declare interface Franchise {
  apiCode: string
  league: Schema.Types.ObjectId
  ownership: string[]
  affliation: string
  team: Schema.Types.ObjectId
  teamCity: string
  teamName: string
  teamAbbreviation: string
  founded: string
  history: string
  arena: string
  years: number
  games: number
  wins: number
  losses: number
  winPercentage: number
  playoffAppearances: number
  divisionTitles: number
  conferenceTitles: number
  championships: number
  teamHistory: Object[]
  retiredJerseys: Schema.Types.ObjectId[]
  isActive: boolean
}

declare interface StatCategory {
  _id: Schema.Types.ObjectId
  apiCode: string
  leagueName: string
  [key: string]: any
}

declare interface Minute {
  minutes: number
  minutesPerGame: number
}

declare interface Point extends FieldGoal, ThreePoint, FreeThrow {
  points: number
  pointsPerGame: number
}

declare interface FieldGoal {
  fieldGoalsMade: number
  fieldGoalsAttempted: number
  fieldGoalPercentage: number
  fieldGoalsMadePerGame: number
  fieldGoalsAttemptedPerGame: number
}

declare interface ThreePoint {
  threePointersMade: number
  threePointersAttempted: number
  threePointersMadePerGame: number
  threePointersAttemptedPerGame: number
  threePointPercentage: number
}

declare interface FreeThrow {
  freeThrowsMade: number
  freeThrowsAttempted: number
  freeThrowPercentage: number
  freeThrowsMadePerGame: number
  freeThrowsAttemptedPerGame: number
}

declare interface Rebound {
  offensiveRebounds: number
  defensiveRebounds: number
  rebounds: number
  offensiveReboundsPerGame: number
  defensiveReboundsPerGame: number
  reboundsPerGame: number
}

declare interface Assist {
  assists: number
  assistsPerGame
}

declare interface Steal {
  steals: number
  stealsPerGame: number
}

declare interface Block {
  blocks: number
  blocksPerGame: number
}

declare interface Turnover {
  turnovers: number
  turnoversPerGame: number
}

declare interface Foul {
  teamFouls: number
  personalFouls: number
  technicalFouls: number
  flagrantFouls: number
  personalFoulsPerGame: number
  technicalFoulsPerGame: number
  flagrantFoulsPerGame: number
  teamFoulsPerGame: number
}

declare interface Totals {
  mins: number
  gamesPlayed: number
  winPercentage: number
  wins: number
  loses: number
  points: number
  fieldGoalsMade: number
  fieldGoalsAttempted: number
  threePointersMade: number
  threePointersAttempted: number
  freeThrowsMade: number
  freeThrowsAttempted: number
  offensiveRebounds: number
  defensiveRebounds: number
  totalRebounds: number
  assists: number
  steals: number
  blocks: number
  turnovers: number
  personalFouls: number
  technicalFouls: number
  flagrantFouls: number
  doubleDoubles: number
  tripleDoubles: number
}

declare interface Stats extends Minute, Rebound, Assist, Steal, Block, Turnover, Foul, Point {
  _id: Schema.Types.ObjectId
  team: Schema.Types.ObjectId
  player: Schema.Types.ObjectId
  apiCode: string
  gamesPlayed: number
  wins: number
  losses: number
  winPercentage: number
  minutes: number
  doubleDoubles: number
  tripleDoubles: number
}

declare interface PlayerStats extends Stats {
  player: Schema.Types.ObjectId
  plusMinus: number
  playerEfficiencyRating: number
  pointsRank: number
  assistRank: number
  reboundRank: number
  stealRank: number
  blockRank: number
  fieldGoalPercentageRank: number
  threePointPercentageRank: number
  freeThrowPercentageRank: number
  personalFoulsRank: number
  pointsPerGameRank: number
  reboundsPerGameRank: number
  assistsPerGameRank: number
  stealsPerGameRank: number
  blocksPerGameRank: number
  turnoversPerGameRank: number
  personalFoulsPerGameRank: number
  playoffAppearances: string | number
  conferenceFinalsAppearances: string | number
  finalsAppearances: string | number
}

declare interface TeamStats extends Stats {
  team: Schema.Types.ObjectId
  // TODO: #35 change to schema whe season module is created
  season: string
  teamFouls: number
  pointsRank: number
  assistRank: number
  reboundRank: number
  stealRank: number
  blockRank: number
  fieldGoalPercentageRank: number
  threePointPercentageRank: number
  freeThrowPercentageRank: number
  conferenceRank: number
  divisionRank: number
  teamFoulsRank: number
  pointsPerGameRank: number
  reboundsPerGameRank: number
  assistsPerGameRank: number
  stealsPerGameRank: number
  blocksPerGameRank: number
  turnoversPerGameRank: number
  personalFoulsPerGameRank: number
  playoffAppearances: string
  conferenceFinalsAppearances: string
  finalsAppearances: string
}

declare interface TeamStatsOverview {
  team: Schema.Types.ObjectId
  regularSeasonStats: Schema.Types.ObjectId
  playoffsStats: Schema.Types.ObjectId
}

declare interface PlayerStatsOverview {
  player: Schema.Types.ObjectId
  regularSeasonStats: Schema.Types.ObjectId
  playoffsStats: Schema.Types.ObjectId
}

declare interface GameStats extends Stats {
  game: Schema.Types.ObjectId
  playbook: Schema.Types.ObjectId
  rotation: Schema.Types.ObjectId
  // player: Schema.Types.ObjectId[]
  // team : Schema.Types.ObjectId[]
  // boxScore: BoxScore
  // team1Stats: TeamStats
  // team2Stats: TeamStats
  // playerTotalStats:
  totalStats: TotalStats
}

declare interface TotalStats extends Minute, Point, Rebound, Assist, Steal, Block, Turnover, Foul {
  totalMinutes: number
  totalGamesPlayed: number
  totalPoints: number
  totalFieldGoalsMade: number
  totalFieldGoalsAttempted: number
  totalThreePointersMade: number
  totalThreePointersAttempted: number
  totalFreeThrowsMade: number
  totalFreeThrowsAttempted: number
  totalOffensiveRebounds: number
  totalDefensiveRebounds: number
  totalRebounds: number
  totalAssists: number
  totalSteals: number
  totalBlocks: number
  totalTurnovers: number
  totalPersonalFouls: number
  totalTeamFouls: number
}

declare interface Per36Stats extends Minute, Point, Rebound, Assist, Steal, Block, Turnover, Foul {
  per36Minutes: number
  pointsPer36: number
  fieldGoalsMadePer36: number
  fieldGoalsAttemptedPer36: number
  threePointersMadePer36: number
  threePointersAttemptedPer36: number
  freeThrowsMadePer36: number
  freeThrowsAttemptedPer36: number
  offensiveReboundsPer36: number
  defensiveReboundsPer36: number
  reboundsPer36: number
  assistsPer36: number
  stealsPer36: number
  blocksPer36: number
  turnoversPer36: number
  personalFoulsPer36: number
  teamFoulsPer36: number
}

declare interface Per48Stats extends Minute, Point, Rebound, Assist, Steal, Block, Turnover, Foul {
  per48Minutes: number
  pointsPer48: number
  fieldGoalsMadePer48: number
  fieldGoalsAttemptedPer48: number
  threePointersMadePer48: number
  threePointersAttemptedPer48: number
  freeThrowsMadePer48: number
  freeThrowsAttemptedPer48: number
  offensiveReboundsPer48: number
  defensiveReboundsPer48: number
  reboundsPer48: number
  assistsPer48: number
  stealsPer48: number
  blocksPer48: number
  turnoversPer48: number
  personalFoulsPer48: number
  teamFoulsPer48: number
}

declare interface AllStarStats extends Stats {
  allStar: Schema.Types.ObjectId
}

declare interface RegularSeasonStats extends Stats {
  season: Schema.Types.ObjectId
  team: Schema.Types.ObjectId
  player: Schema.Types.ObjectId
  coach: Schema.Types.ObjectId
  totals: TotalStats
  per36: Per36Stats
  per48: Per48Stats
}

declare interface AllStarStats extends Stats {
  allStar: Schema.Types.ObjectId
}

declare interface PlayoffStats extends Stats {
  season: Schema.Types.ObjectId
  totals: TotalStats
  per36: Per36Stats
  per48: Per48Stats
}
declare interface FinalsStats extends PlayoffStats {
  playoffs: Schema.Types.ObjectId
}

declare interface Totals {}

declare interface Awards {
  _id: Schema.Types.ObjectId
  apiCode: string
  season: Schema.Types.ObjectId
  mvp: Schema.Types.ObjectId
  dpoy: Schema.Types.ObjectId
  roy: Schema.Types.ObjectId
  [key: string]: any
}

declare interface PlayoffAwards {
  _id: Schema.Types.ObjectId
  apiCode: string
  playoffs: Schema.Types.ObjectId
  conferenceChampion: Schema.Types.ObjectId
  conferenceMvp: Schema.Types.ObjectId
  champion: Schema.Types.ObjectId
  finalsMvp: Schema.Types.ObjectId
  [key: string]: any
}

declare interface MVP {
  _id: Schema.Types.ObjectId
  apiCode: string
  season: Schema.Types.ObjectId
  player: Schema.Types.ObjectId
}

declare interface DPOY {
  _id: Schema.Types.ObjectId
  apiCode: string
  season: Schema.Types.ObjectId
  player: Schema.Types.ObjectId
}

declare interface ROY {
  _id: Schema.Types.ObjectId
  apiCode: string
  season: Schema.Types.ObjectId
  player: Schema.Types.ObjectId
}

declare interface ConferenceChampion {
  _id: Schema.Types.ObjectId
  apiCode: string
  playoffs: Schema.Types.ObjectId
  team: Schema.Types.ObjectId
}

declare interface ConferenceMVP {
  _id: Schema.Types.ObjectId
  apiCode: string
  playoffs: Schema.Types.ObjectId
  player: Schema.Types.ObjectId
}

declare interface Champion {
  _id: Schema.Types.ObjectId
  apiCode: string
  season: Schema.Types.ObjectId
  playoffs: Schema.Types.ObjectId
  team: Schema.Types.ObjectId
}

declare interface FinalsMVP {
  _id: Schema.Types.ObjectId
  apiCode: string
  playoffs: Schema.Types.ObjectId
  player: Schema.Types.ObjectId
}

declare interface Playoffs {
  _id: Schema.Types.ObjectId
  apiCode: string
  season: Schema.Types.ObjectId
  games: Schema.Types.ObjectId[]
  teams: Schema.Types.ObjectId[]
  [key: string]: any
}

declare interface Player {
  _id: Schema.Types.ObjectId
  apiCode: string
  playerCode: string
  firstname: string
  lastname: string
  fullname: string
  nickname: string[]
  age: number
  height: string
  weight: number
  position: string[]
  dateOfBirth: Date
  birthPlace: string
  highSchool: string
  college: string
  school: string
  fromYear: string
  toYear: string
  experience: number
  draft: Schema.Types.ObjectId
  team: Schema.Types.ObjectId[]
  stats: Schema.Types.ObjectId
  allStar: Schema.Types.ObjectId
  awards: Schema.Types.ObjectId[]
  jerseys: Schema.Types.ObjectId[]
  isActive: boolean
  [key: string]: any
}

declare interface Coach {
  _id: Schema.Types.ObjectId
  apiCode: string
  firstname: string
  lastname: string
  team: Schema.Types.ObjectId
  record: string
  isActive: boolean
  [key: string]: any
}

declare interface Team {
  _id: Schema.Types.ObjectId
  apiCode: string
  name: string
  city: string
  state: string
  abbreviation: string
  nickname: string
  season: Schema.Types.ObjectId
  coach: Schema.Types.ObjectId
  players: Schema.Types.ObjectId[]
  stats: Schema.Types.ObjectId
  statsHistory: Schema.Types.ObjectId[]
  franchise: Schema.Types.ObjectId
  retiredJerseys: Schema.Types.ObjectId[]
  slug: string[]
  [key: string]: any
}

declare enum TeamAbbv {
  ATL = 'ATL' || 'atl',
  BOS = 'BOS' || 'bos',
  BKN = 'BKN' || 'bkn',
  CHA = 'CHA' || 'cha',
  CHI = 'CHI' || 'chi',
  CLE = 'CLE' || 'cle',
  DAL = 'DAL' || 'dal',
  DEN = 'DEN' || 'den',
  DET = 'DET' || 'det',
  GSW = 'GSW' || 'gsw',
  HOU = 'HOU' || 'hou',
  IND = 'IND' || 'ind',
  LAC = 'LAC' || 'lac',
  LAL = 'LAL' || 'lal',
  MEM = 'MEM' || 'mem',
  MIA = 'MIA' || 'mia',
  MIL = 'MIL' || 'mil',
  MIN = 'MIN' || 'min',
  NOP = 'NOP' || 'nop',
  NYK = 'NYK' || 'nyk',
  OKC = 'OKC' || 'okc',
  ORL = 'ORL' || 'orl',
  PHI = 'PHI' || 'phi',
  PHX = 'PHX' || 'phx',
  POR = 'POR' || 'por',
  SAC = 'SAC' || 'sac',
  SAS = 'SAS' || 'sas',
  TOR = 'TOR' || 'tor',
  UTA = 'UTA' || 'uta',
  WAS = 'WAS' || 'was'
}

declare interface Roster {
  _id: Schema.Types.ObjectId
  apiCode: string
  season: Schema.Types.ObjectId
  record: Schema.Types.ObjectId
  playbook: Schema.Types.ObjectId
  team: Schema.Types.ObjectId
  players: Schema.Types.ObjectId[]
  coachStaff: Schema.Types.ObjectId[]
}

declare interface CoachStaff {
  _id: Schema.Types.ObjectId
  apiCode: string
  season: Schema.Types.ObjectId
  team: Schema.Types.ObjectId
  headCoach: Schema.Types.ObjectId
  staff: Schema.Types.ObjectId[]
}

declare interface RosterPlayers {
  _id: Schema.Types.ObjectId
  apiCode: string
  teamCode: string
  season: Schema.Types.ObjectId
  team: Schema.Types.ObjectId
  players: Schema.Types.ObjectId[]
}

declare interface RosterPlayer extends Player {
  _id: Schema.Types.ObjectId
  currentPosition: string
  jersey: number
}

declare interface Coach {
  _id: Schema.Types.ObjectId
  apiCode: string
  firstname: string
  lastname: string
  team: Schema.Types.ObjectId
  record: Schema.Types.ObjectId
  isActive: boolean
}

declare interface Staff {
  _id: Schema.Types.ObjectId
  apiCode: string
  firstname: string
  lastname: string
  team: Schema.Types.ObjectId
  role: string
  isActive: boolean
}

declare interface Season {
  _id: Schema.Types.ObjectId
  year: Date | string
  apiCode: string
  league: Schema.Types.ObjectId
  teams: Schema.Types.ObjectId[]
  games: Schema.Types.ObjectId[]
  stats: Schema.Types.ObjectId[]
  leaders: Schema.Types.ObjectId[]
}

declare interface Record {
  _id: Schema.Types.ObjectId
  apiCode: string
  season: Schema.Types.ObjectId
  team: Schema.Types.ObjectId
  wins: number
  losses: number
  isPlayoffBound: boolean
  winPercentage: number
}

declare interface DraftSeason {
  _id: Schema.Types.ObjectId
  apiCode: string
  year: Date | string
  draft: Schema.Types.ObjectId
  picks: Schema.Types.ObjectId[]
  [key: string]: any
}

declare interface DraftPick {
  _id: Schema.Types.ObjectId
  apiCode: string
  season: Schema.Types.ObjectId
  round: number
  pick: number
  team: Schema.Types.ObjectId
  player: Schema.Types.ObjectId
  [key: string]: any
}

declare interface Draft {
  _id: Schema.Types.ObjectId
  apiCode: string
  season: Schema.Types.ObjectId
  pick: Schema.Types.ObjectId
  player: Schema.Types.ObjectId
  [key: string]: any
}

declare interface AllStarGame {
  _id: Schema.Types.ObjectId
  apiCode: string
  season: Schema.Types.ObjectId
  date: Date
  location: string
  mvp: Schema.Types.ObjectId
  east: Schema.Types.ObjectId
  west: Schema.Types.ObjectId
  [key: string]: any
}

declare interface AllStarEastCoach {
  _id: Schema.Types.ObjectId
  apiCode: string
  team: Schema.Types.ObjectId
  coaches: Schema.Types.ObjectId[]
}

declare interface AllStarWestCoach {
  _id: Schema.Types.ObjectId
  apiCode: string
  team: Schema.Types.ObjectId
  coaches: Schema.Types.ObjectId[]
}

declare interface AllStarEast {
  _id: Schema.Types.ObjectId
  apiCode: string
  team: Schema.Types.ObjectId
  players: Schema.Types.ObjectId[]
  coach: Schema.Types.ObjectId
}

declare interface AllStarWest {
  _id: Schema.Types.ObjectId
  apiCode: string
  team: Schema.Types.ObjectId
  players: Schema.Types.ObjectId[]
  coach: Schema.Types.ObjectId
}

declare interface AllStar {
  _id: Schema.Types.ObjectId
  apiCode: string
  game: Schema.Types.ObjectId[]
  player: Schema.Types.ObjectId
  selections: number
  isMVP: boolean
  isStarter: boolean
}

declare interface Championship {
  _id: Schema.Types.ObjectId
  apiCode: string
  season: Schema.Types.ObjectId
  team: Schema.Types.ObjectId
}

declare interface DivisionTitle {
  _id: Schema.Types.ObjectId
  apiCode: string
  season: Schema.Types.ObjectId
  team: Schema.Types.ObjectId
}

declare interface ConferenceTitle {
  _id: Schema.Types.ObjectId
  apiCode: string
  season: Schema.Types.ObjectId
  team: Schema.Types.ObjectId
}

declare interface RetiredJersey {
  _id: Schema.Types.ObjectId
  apiCode: string
  team: Schema.Types.ObjectId
  player: Schema.Types.ObjectId
  jersey: number
}

declare interface Jersey {
  _id: Schema.Types.ObjectId
  apiCode: string
  team: Schema.Types.ObjectId
  player: Schema.Types.ObjectId
  jersey: number
}
