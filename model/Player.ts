import slugify from 'slugify'
import goodlog from 'good-logs'
import { Schema, model } from 'mongoose'
import { TAGS, LOCALE } from 'constant'

const TAG = TAGS.PLAYER

const PlayerSchema: Schema<Player> = new Schema<Player>(
  {
    apiCode: { type: String, required: true, unique: true },
    playerCode: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    nickname: { type: [String] },
    birthDate: { type: Date },
    birthPlace: { type: String },
    highSchool: { type: String },
    college: { type: String },
    height: { type: String },
    weight: { type: Number },
    position: { type: [String] },
    draft: { type: Schema.Types.ObjectId, ref: 'Draft' },
    team: { type: [Schema.Types.ObjectId], ref: 'Team' },
    stats: { type: Schema.Types.ObjectId, ref: 'PlayerStats' },
    allStar: { type: Schema.Types.ObjectId, ref: 'AllStar' },
    awards: { type: [Schema.Types.ObjectId], ref: 'Award' },
    jerseys: { type: [Schema.Types.ObjectId], ref: 'Jersey' },
    leagues: { type: [Schema.Types.ObjectId], ref: TAGS.LEAGUE },
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

PlayerSchema.virtual('fullname').get(function () {
  return `${this.firstname} ${this.lastname}`
})

PlayerSchema.virtual('age').get(function () {
  const diff = Date.now() - this.birthDate.getTime()
  const ageDate = new Date(diff)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
})

PlayerSchema.index({ apiCode: 1 }, { unique: true })

PlayerSchema.pre('save', function (next) {
  goodlog.log(`${TAG} pre save hook`)
  next()
})

PlayerSchema.post('save', function (doc) {
  goodlog.log(`${TAG} post save hook`)
})

const Player = model<Player>(TAG, PlayerSchema)
export default Player
