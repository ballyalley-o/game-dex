import { Schema, model } from 'mongoose'
import { TAGS, LOCALE } from 'constant'

const TAG = TAGS.COACH

const CoachSchema: Schema<Coach> = new Schema<Coach>(
  {
    apiCode: { type: String, required: true },
    firstname: { type: String },
    lastname: { type: String },
    nickname: { type: String },
    birthDate: { type: Date },
    birthPlace: { type: String },
    highSchool: { type: String },
    college: { type: String },
    height: { type: String },
    weight: { type: Number },
    coachType: { type: Schema.Types.ObjectId, ref: TAGS.ROLE },
    team: [{ type: Schema.Types.ObjectId, ref: TAGS.TEAM }],
    record: { type: Schema.Types.ObjectId, ref: TAGS.RECORD },
    allStar: { type: Schema.Types.ObjectId, ref: TAGS.ALL_STAR },
    awards: { type: [Schema.Types.ObjectId], ref: TAGS.AWARD },
    leagues: { type: [Schema.Types.ObjectId], ref: TAGS.LEAGUE },
    playerCode: { type: String },
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

CoachSchema.virtual('fullname').get(function () {
  return `${this.firstname} ${this.lastname}`
})

CoachSchema.virtual('age').get(function () {
  if (!this.birthDate) return null
  const diff = Date.now() - this.birthDate.getTime()

  const ageDate = new Date(diff)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
})

CoachSchema.index({ apiCode: 1 }, { unique: true })

const Coach = model<Coach>(TAG, CoachSchema)
export default Coach
