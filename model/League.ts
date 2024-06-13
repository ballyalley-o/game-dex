import goodlog from 'good-logs'
import { Schema, model } from 'mongoose'
import { LOCALE, TAGS } from 'constant'

const TAG = TAGS.LEAGUE

const LeagueSchema: Schema<League> = new Schema<League>(
  {
    apiCode: { type: String, required: true, unique: true },
    league: { type: String },
    abbv: { type: String },
    commissioner: { type: String },
    teams: { type: [Schema.Types.ObjectId], ref: TAGS.TEAM },
    founded: { type: String },
    headquarters: { type: String },
    website: { type: String },
    logo: { type: String },
    slug: { type: [String] },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true,
    collation: { locale: LOCALE.EN, strength: 2 },
    collection: TAG,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

LeagueSchema.virtual('noOfTeams').get(function () {
  return this.teams.length
})

LeagueSchema.index({ apiCode: 1 }, { unique: true })

LeagueSchema.pre('save', function (next) {
  goodlog.log(`${TAG} pre save hook`)
  next()
})

LeagueSchema.post('save', function (doc) {
  goodlog.log(`${TAG} post save hook`)
})

const League = model<League>(TAG, LeagueSchema)
export default League
