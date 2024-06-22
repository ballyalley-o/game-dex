import { Schema } from 'mongoose'
import { Stats } from 'model'
import { TAGS } from 'constant'

const TAG = TAGS.PLAYER_STATS

const PlayerStatsSchema: Schema<PlayerStats> = new Schema<PlayerStats>(
  {
    apiCode: { type: String, required: true, unique: true },
    plusMinus: { type: Number },
    playerEfficiencyRating: { type: Number },
    doubleDoubles: { type: Number },
    tripleDoubles: { type: Number },
    pointsRank: { type: Number },
    assistRank: { type: Number },
    reboundRank: { type: Number },
    stealRank: { type: Number },
    blockRank: { type: Number },
    fieldGoalPercentageRank: { type: Number },
    threePointPercentageRank: { type: Number },
    freeThrowPercentageRank: { type: Number },
    pointsPerGame: { type: Number },
    reboundsPerGame: { type: Number },
    assistsPerGame: { type: Number },
    stealsPerGame: { type: Number },
    blocksPerGame: { type: Number },
    turnoversPerGame: { type: Number },
    personalFoulsPerGame: { type: Number }
  },
  {
    timestamps: true,
    collection: TAG,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

const PlayerStats = Stats.discriminator<PlayerStats>(TAG, PlayerStatsSchema)
export default PlayerStats
