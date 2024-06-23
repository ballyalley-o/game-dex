import { Schema, model } from 'mongoose'
import { TAGS } from 'constant'

const TAG = TAGS.PLAYER_STATS_OVERVIEW

const PlayerStatsOverviewSchema: Schema<PlayerStatsOverview> = new Schema<PlayerStatsOverview>(
  {
    player: { type: Schema.Types.ObjectId, ref: TAGS.PLAYER },
    regularSeasonStats: { type: Schema.Types.ObjectId, ref: TAGS.PLAYER_REGULAR_SEASON_STATS },
    playoffsStats: { type: Schema.Types.ObjectId, ref: TAGS.PLAYER_PLAYOFFS_STATS }
  },
  {
    timestamps: true,
    collection: TAG,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

const PlayerStats = model<PlayerStatsOverview>(TAG, PlayerStatsOverviewSchema)
export default PlayerStats
