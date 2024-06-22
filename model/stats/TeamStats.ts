import { Schema, model } from 'mongoose'
import { Stats } from 'model'
import { TAGS } from 'constant'

const TAG = TAGS.TEAM_STATS

const TeamStatsSchema: Schema<TeamStats> = new Schema<TeamStats>(
  {
    apiCode: { type: String, required: true, unique: true },
    gamesPlayed: { type: Number },
    teamFouls: { type: Number },
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
    playoffAppearances: { type: Number },
    conferenceFinalsAppearances: { type: Number },
    finalsAppearances: { type: Number }
  },
  {
    timestamps: true,
    collection: TAG,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

const TeamStats = Stats.discriminator<TeamStats>(TAG, TeamStatsSchema)
export default TeamStats
