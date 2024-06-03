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

declare interface Player {
  _id: Schema.Types.ObjectId
  apiCode: string
  firstname: string
  lastname: string
  team: Schema.Types.ObjectId
  record: string
  draftSeason: string
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

declare interface Year {
  _id: Schema.Types.ObjectId
  year: Date | string
  apiCode: string
  [key: string]: any
}
