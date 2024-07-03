import { Schema, model } from 'mongoose'
import { TAGS, LOCALE } from 'constant'

const TAG = TAGS.SEASON

const SeasonSchema: Schema<Season> = new Schema<Season>(
  {
    apiCode: { type: String },
    fromYear: { type: String, required: true },
    toYear: { type: String, required: true },
    teams: [{ type: Schema.Types.ObjectId, ref: TAGS.TEAM }],
    games: [{ type: Schema.Types.ObjectId, ref: TAGS.GAME }],
    players: [{ type: Schema.Types.ObjectId, ref: TAGS.PLAYER }],
    stats: [{ type: Schema.Types.ObjectId, ref: TAGS.STATS }],
    leaders: [{ type: Schema.Types.ObjectId, ref: TAGS.PLAYER }],
    awards: [{ type: Schema.Types.ObjectId, ref: TAGS.AWARD }],
    hof: [{ type: Schema.Types.ObjectId, ref: TAGS.HOF }],
    notableEvents: [{ type: Schema.Types.ObjectId, ref: TAGS.NOTABLE_EVENT }],
    status: { type: String, default: 'completed' },
    slug: [{ type: String }]
  },
  {
    timestamps: true,
    collation: { locale: LOCALE.EN, strength: 2 },
    collection: TAG,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

SeasonSchema.virtual('season').get(function (this: Season) {
  const fromYear = new Date(this.fromYear)
  const toYear = new Date(this.toYear)
  return `${fromYear.getFullYear()}-${toYear.getFullYear()}`
})

const Season = model<Season>(TAG, SeasonSchema)
export default Season
