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
  statCategory: string
}

declare interface AllTimeAssistLeaders {
  _id: Schema.Types.ObjectId
  apiCode: string
  player: Schema.Types.ObjectId
  assist: number
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

declare interface Stats {
  _id: Schema.Types.ObjectId
  apiCode: string
  minutes: number
  fieldGoalsMade: number
  fieldGoalsAttempted: number
  fieldGoalPercentage: number
  threePointMade: number
  threePointAttempted: number
  threePointPercentage: number
  freeThrowsMade: number
  freeThrowsAttempted: number
  freeThrowPercentage: number
  offensiveRebounds: number
  defensiveRebounds: number
  totalRebounds: number
  assists: number
  steals: number
  blocks: number
  turnovers: number
  personalFouls: number
  points: number
  [key: string]: any
}

declare interface PlayerStats extends Stats {
  player: Schema.Types.ObjectId
}

declare interface TeamStats extends Stats {
  team: Schema.Types.ObjectId
}

declare interface GameStats extends Stats {
  game: Schema.Types.ObjectId
}

declare interface Player {
  _id: Schema.Types.ObjectId
  apiCode: string
  firstname: string
  lastname: string
  team: Schema.Types.ObjectId
  record: string
  stats: Schema.Types.ObjectId
  draftSeason: Schema.Types.ObjectId
  draftRound: number
  draftPick: number
  isDrafted: boolean
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
  [key: string]: any
}

declare interface DraftPick {
  _id: Schema.Types.ObjectId
  apiCode: string
  season: Schema.Types.ObjectId
  round: number
  pick: number
  player: Schema.Types.ObjectId
  [key: string]: any
}

declare interface Draft {
  _id: Schema.Types.ObjectId
  apiCode: string
  season: Schema.Types.ObjectId
  picks: Schema.Types.ObjectId[]
  [key: string]: any
}
