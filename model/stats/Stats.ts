import { Schema, model } from 'mongoose'
import { TAGS } from 'constant'

const TAG = TAGS.STATS

const StatsSchema: Schema<Stats> = new Schema<Stats>(
  {
    apiCode: { type: String, required: true, unique: true },
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
    totalRebounds: { type: Number },
    assists: { type: Number },
    turnovers: { type: Number },
    steals: { type: Number },
    blocks: { type: Number },
    personalFouls: { type: Number },
    technicalFouls: { type: Number },
    flagrantFouls: { type: Number },
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
