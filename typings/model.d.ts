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

declare interface StatCategory {
  _id: Schema.Types.ObjectId
  apiCode: string
  name: string
  [key: string]: any
}

declare interface Minute {
  minutes: number
}

declare interface Point extends FieldGoal, ThreePoint, FreeThrow {
  points: number
}

declare interface FieldGoal {
  fieldGoalsMade: number
  fieldGoalsAttempted: number
  fieldGoalPercentage: number
}

declare interface ThreePoint {
  threePointMade: number
  threePointAttempted: number
  threePointPercentage: number
}

declare interface FreeThrow {
  freeThrowsMade: number
  freeThrowsAttempted: number
  freeThrowPercentage: number
}

declare interface Rebound {
  offensiveRebounds: number
  defensiveRebounds: number
  totalRebounds: number
}

declare interface Assist {
  assists: number
}

declare interface Steal {
  steals: number
}

declare interface Block {
  blocks: number
}

declare interface Turnover {
  turnovers: number
}

declare interface Foul {
  teamFouls: number
  personalFouls: number
  technicalFouls: number
  flagrantFouls: number
  [key: string]: any
}

declare interface Stats extends Minute, Rebound, Assist, Steal, Block, Turnover, Foul, Point {
  _id: Schema.Types.ObjectId
  apiCode: string
}

declare interface PlayerStats extends Stats {
  player: Schema.Types.ObjectId
  regularSeasonStats: Schema.Types.ObjectId
  allStarStats: Schema.Types.ObjectId
  playoffStats: Schema.Types.ObjectId
  finalsStats: Schema.Types.ObjectId
}

declare interface TeamStats extends Stats {
  team: Schema.Types.ObjectId
}

declare interface GameStats extends Stats {
  game: Schema.Types.ObjectId
}

declare interface RegularSeasonStats extends Stats {
  season: Schema.Types.ObjectId
}

declare interface AllStarStats extends Stats {
  allStar: Schema.Types.ObjectId
}

declare interface PlayoffStats extends Stats {
  season: Schema.Types.ObjectId
}

declare interface FinalsStats extends PlayoffStats {
  playoffs: Schema.Types.ObjectId
}

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
  firstname: string
  lastname: string
  team: Schema.Types.ObjectId
  record: string
  draft: Schema.Types.ObjectId
  stats: Schema.Types.ObjectId
  allStar: Schema.Types.ObjectId
  awards: Schema.Types.ObjectId[]
  jerseys: Schema.Types.ObjectId[]
  isRetired: boolean
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
  abbreviation: string
  conference: string
  division: string
  record: string
  stats: Schema.Types.ObjectId
  championships: number
  divisionTitles: number
  conferenceTitles: number
  retiredJerseys: Schema.Types.ObjectId[]
  [key: string]: any
}

declare interface Season {
  _id: Schema.Types.ObjectId
  year: Date | string
  apiCode: string
  [key: string]: any
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
