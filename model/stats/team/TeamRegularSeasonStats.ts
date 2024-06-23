import { Schema } from 'mongoose'
import { Stats } from 'model'
import { TAGS } from 'constant'

const TAG = TAGS.TEAM_REGULAR_SEASON_STATS

const TeamRegularSeasonStatsSchema: Schema<TeamStats> = new Schema<TeamStats>(
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
    personalFoulsPerGameRank: { type: Number },
    playoffAppearances: { type: String },
    conferenceFinalsAppearances: { type: String },
    finalsAppearances: { type: String }
  },
  {
    timestamps: true,
    collection: TAG,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

const TeamRegularSeasonStats = Stats.discriminator<TeamStats>(TAG, TeamRegularSeasonStatsSchema)
export default TeamRegularSeasonStats
