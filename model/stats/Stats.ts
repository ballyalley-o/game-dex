import { Schema, model } from 'mongoose'
import { TAGS } from 'constant'

const TAG = TAGS.STATS

const StatsSchema: Schema<Stats> = new Schema<Stats>(
  {
    apiCode: { type: String, required: true },
    team: { type: Schema.Types.ObjectId, ref: TAGS.TEAM },
    player: { type: Schema.Types.ObjectId, ref: TAGS.PLAYER },
    gamesPlayed: { type: Number },
    wins: { type: Number },
    losses: { type: Number },
    winPercentage: { type: Number },
    minutes: { type: Number },
    points: { type: Number },
    fieldGoalsMade: { type: Number },
    fieldGoalsAttempted: { type: Number },
    fieldGoalPercentage: { type: Number },
    threePointersMade: { type: Number },
    threePointersAttempted: { type: Number },
    threePointPercentage: { type: Number },
    freeThrowsMade: { type: Number },
    freeThrowsAttempted: { type: Number },
    freeThrowPercentage: { type: Number },
    offensiveRebounds: { type: Number },
    defensiveRebounds: { type: Number },
    rebounds: { type: Number },
    assists: { type: Number },
    turnovers: { type: Number },
    steals: { type: Number },
    blocks: { type: Number },
    personalFouls: { type: Number },
    technicalFouls: { type: Number },
    flagrantFouls: { type: Number },
    pointsPerGame: { type: Number },
    reboundsPerGame: { type: Number },
    offensiveReboundsPerGame: { type: Number },
    defensiveReboundsPerGame: { type: Number },
    assistsPerGame: { type: Number },
    stealsPerGame: { type: Number },
    blocksPerGame: { type: Number },
    turnoversPerGame: { type: Number },
    personalFoulsPerGame: { type: Number },
    technicalFoulsPerGame: { type: Number },
    flagrantFoulsPerGame: { type: Number },
    doubleDoubles: { type: Number },
    tripleDoubles: { type: Number }
  },
  {
    timestamps: true,
    collection: TAG,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

const Stats = model<Stats>(TAG, StatsSchema)
export default Stats
