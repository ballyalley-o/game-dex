import { Schema, model } from 'mongoose'
import { TAGS, LOCALE } from 'constant'

const TAG = TAGS.RECORD

const RecordSchema: Schema<IRecord> = new Schema<IRecord>(
  {
    apiCode: { type: String },
    season: { type: Schema.Types.ObjectId, ref: TAGS.SEASON },
    wins: { type: Number },
    losses: { type: Number },
    record: { type: String },
    isPlayoffBound: { type: Boolean },
    winPercentage: { type: Number }
  },
  {
    timestamps: true,
    collation: { locale: LOCALE.EN, strength: 2 },
    collection: TAG,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

const Record = model<IRecord>(TAG, RecordSchema)
export default Record
