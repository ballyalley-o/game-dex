import { Schema, model } from 'mongoose'
import { Stats } from 'model'
import { TAGS } from 'constant'

const TAG = TAGS.TEAM_STATS_OVERVIEW

const TeamStatsOverviewSchema: Schema<TeamStatsOverview> = new Schema<TeamStatsOverview>(
  {
    team: { type: Schema.Types.ObjectId, ref: TAGS.TEAM },
    regularSeasonStats: { type: Schema.Types.ObjectId, ref: TAGS.TEAM_REGULAR_SEASON_STATS },
    playoffsStats: { type: Schema.Types.ObjectId, ref: TAGS.TEAM_PLAYOFFS_STATS }
  },
  {
    timestamps: true,
    collection: TAG,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

const TeamStatsOverview = model<TeamStatsOverview>(TAG, TeamStatsOverviewSchema)
export default TeamStatsOverview
