import { Schema, model } from 'mongoose'
import { TAGS } from 'constant'

const TAG = TAGS.TEAM_STATS

const GameStatsSchema: Schema<GameStats> = new Schema<GameStats>(
  {
    apiCode: { type: String, required: true, unique: true },
    playerStats: { type: [Schema.Types.ObjectId], ref: TAGS.PLAYER_STATS },
    teamStats: { type: [Schema.Types.ObjectId], ref: TAGS.TEAM_STATS }
  },
  {
    timestamps: true,
    collection: TAG,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

GameStatsSchema.virtual('totalStats').get(function () {
  return this.playerStats.reduce(
    (acc, curr) => {
      const playerStats = curr as PlayerStats
      acc.points += playerStats.points
      acc.fieldGoalsMade += playerStats.fieldGoalsMade
      acc.fieldGoalsAttempted += playerStats.fieldGoalsAttempted
      acc.threePointersMade += playerStats.threePointersMade
      acc.threePointersAttempted += playerStats.threePointersAttempted
      acc.freeThrowsMade += playerStats.freeThrowsMade
      acc.freeThrowsAttempted += playerStats.freeThrowsAttempted
      acc.offensiveRebounds += playerStats.offensiveRebounds
      acc.defensiveRebounds += playerStats.defensiveRebounds
      acc.totalRebounds += playerStats.totalRebounds
      acc.assists += playerStats.assists
      acc.steals += playerStats.steals
      acc.blocks += playerStats.blocks
      acc.personalFouls += playerStats.personalFouls
      acc.technicalFouls += playerStats.technicalFouls
      acc.flagrantFouls += playerStats.flagrantFouls
      acc.doubleDoubles += playerStats.doubleDoubles
      acc.tripleDoubles += playerStats.tripleDoubles
      acc.turnovers += playerStats.turnovers

      return acc
    },
    {
      points: 0,
      fieldGoalsMade: 0,
      fieldGoalsAttempted: 0,
      threePointersMade: 0,
      threePointersAttempted: 0,
      freeThrowsMade: 0,
      freeThrowsAttempted: 0,
      offensiveRebounds: 0,
      defensiveRebounds: 0,
      totalRebounds: 0
    }
  )
})

const GameStats = model<GameStats>(TAG, GameStatsSchema)
export default GameStats
