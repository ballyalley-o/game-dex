import { Schema, model } from 'mongoose'
import { TAGS, LOCALE } from 'constant'

const TAG = TAGS.JERSEY

const JerseySchema: Schema<Jersey> = new Schema<Jersey>(
  {
    apiCode: { type: String, required: true },
    number: { type: Number, required: true },
    team: { type: Schema.Types.ObjectId, ref: TAGS.TEAM },
    players: [{ type: Schema.Types.ObjectId, ref: TAGS.PLAYER }],
    isRetired: { type: Boolean, default: false },
    retiredTo: { type: Schema.Types.ObjectId, ref: TAGS.PLAYER },
    seasonRetired: { type: Schema.Types.ObjectId, ref: TAGS.SEASON }
  },
  {
    timestamps: true,
    collation: { locale: LOCALE.EN, strength: 2 },
    collection: TAG,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

const Jersey = model<Jersey>(TAG, JerseySchema)
export default Jersey
