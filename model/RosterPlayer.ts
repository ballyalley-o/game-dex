import { Schema, model } from 'mongoose'
import { TAGS, LOCALE } from 'constant'

const TAG = TAGS.ROSTER_PLAYER

const RosterPlayerSchema: Schema<RosterPlayer> = new Schema<RosterPlayer>(
  {
    apiCode: { type: String },
    roster: { type: Schema.Types.ObjectId, ref: TAGS.ROSTER },
    season: { type: Schema.Types.ObjectId, ref: TAGS.SEASON },
    nickname: [{ type: String }],
    // props need from player firstname, lastname, birthdate, apiCode, school
    player: { type: Schema.Types.ObjectId, ref: TAGS.PLAYER },
    position: { type: String },
    height: { type: String },
    weight: { type: String },
    age: { type: Number },
    experience: { type: String },
    jersey: { type: Schema.Types.ObjectId, ref: TAGS.JERSEY },
    howAcquired: { type: String },
    slug: [{ type: String }],
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

const RosterPlayer = model<RosterPlayer>(TAG, RosterPlayerSchema)
export default RosterPlayer
