import { Schema, model } from 'mongoose'
import { TAGS } from 'constant'
import goodlog from 'good-logs'

const TAG = TAGS.TEAM

const TeamSchema: Schema<Team> = new Schema<Team>(
  {
    apiCode: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    abbreviation: { type: String, required: true },
    nickname: { type: String },
    season: { type: String },
    coach: { type: String },
    logo: { type: String },
    roster: { type: Schema.Types.ObjectId, ref: 'Roster' },
    rosterHistory: [{ type: Schema.Types.ObjectId, ref: 'Roster' }],
    stats: { type: Schema.Types.ObjectId, ref: TAGS.TEAM_STATS_OVERVIEW },
    statsHistory: [{ type: Schema.Types.ObjectId, ref: TAGS.TEAM_STATS_OVERVIEW }],
    players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    franchise: { type: Schema.Types.ObjectId, ref: 'Franchise' }
  },
  {
    timestamps: true,
    collation: { locale: 'en', strength: 2 },
    collection: TAG,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

TeamSchema.virtual('slug').get(function () {
  return this.name.toLowerCase().replace(/\s/g, '-')
})

TeamSchema.pre('save', function (next) {
  goodlog.log(`${TAGS.TEAM} pre save hook`)
  next()
})

TeamSchema.post('save', function (doc) {
  goodlog.log(`${TAGS.TEAM} post save hook`)
})

TeamSchema.index({ name: 1 }, { unique: true })

const Team = model<Team>(TAG, TeamSchema)
export default Team
