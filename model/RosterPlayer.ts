import { Schema, model } from 'mongoose'
import { TAGS, LOCALE } from 'constant'

const TAG = TAGS.ROSTER_PLAYER

const RosterPlayerSchema: Schema<RosterPlayer> = new Schema<RosterPlayer>(
  {
    roster: { type: Schema.Types.ObjectId, ref: TAGS.ROSTER },
    player: { type: Schema.Types.ObjectId, ref: TAGS.PLAYER },
    position: { type: String },
    jersey: { type: Number },
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
