import { Schema } from 'mongoose'
import { Stats } from 'model'
import { TAGS } from 'constant'

const TAG = TAGS.TEAM_PLAYOFFS_STATS

const TeamPlayoffsStatsSchema: Schema<TeamStats> = new Schema<TeamStats>(
  {
    apiCode: { type: String, required: true },
    team: { type: Schema.Types.ObjectId, ref: TAGS.TEAM },
    gamesPlayed: { type: Number },
    teamFouls: { type: Number },
    divisionRank: { type: Number },
    conferenceRank: { type: Number },
    pointsRank: { type: Number },
    assistRank: { type: Number },
    reboundRank: { type: Number },
    stealRank: { type: Number },
    blockRank: { type: Number },
    fieldGoalPercentageRank: { type: Number },
    threePointPercentageRank: { type: Number },
    freeThrowPercentageRank: { type: Number },
    pointsPerGameRank: { type: Number },
    reboundsPerGameRank: { type: Number },
    assistsPerGameRank: { type: Number },
    stealsPerGameRank: { type: Number },
    blocksPerGameRank: { type: Number },
    turnoversPerGameRank: { type: Number },
    personalFoulsPerGameRank: { type: Number }
  },
  {
    timestamps: true,
    collection: TAG,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

const TeamPlayoffsStats = Stats.discriminator<TeamStats>(TAG, TeamPlayoffsStatsSchema)
export default TeamPlayoffsStats
