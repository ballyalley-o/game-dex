import { Schema } from 'mongoose'
import { Stats } from 'model'
import { TAGS } from 'constant'

const TAG = TAGS.PLAYER_REGULAR_SEASON_STATS

const PlayerRegularSeasonStatsSchema: Schema<PlayerStats> = new Schema<PlayerStats>(
  {
    apiCode: { type: String, required: true },
    player: { type: Schema.Types.ObjectId, ref: TAGS.PLAYER },
    plusMinus: { type: Number },
    playerEfficiencyRating: { type: Number },
    pointsRank: { type: Number },
    assistRank: { type: Number },
    reboundRank: { type: Number },
    stealRank: { type: Number },
    blockRank: { type: Number },
    fieldGoalPercentageRank: { type: Number },
    threePointPercentageRank: { type: Number },
    freeThrowPercentageRank: { type: Number },
    playoffAppearances: { type: Number },
    conferenceFinalsAppearances: { type: String },
    finalsAppearances: { type: Number }
  },
  {
    timestamps: true,
    collection: TAG,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

const PlayerRegularSeasonStats = Stats.discriminator<PlayerStats>(TAG, PlayerRegularSeasonStatsSchema)
export default PlayerRegularSeasonStats
