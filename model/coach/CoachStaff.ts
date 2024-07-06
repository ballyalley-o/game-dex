import { Schema, model } from 'mongoose'
import { TAGS, LOCALE } from 'constant'

const TAG = TAGS.COACH_STAFF

const CoachStaffSchema: Schema<CoachStaff> = new Schema<CoachStaff>(
  {
    apiCode: { type: String },
    season: { type: Schema.Types.ObjectId, ref: TAGS.SEASON },
    team: { type: Schema.Types.ObjectId, ref: TAGS.TEAM },
    headCoach: { type: Schema.Types.ObjectId, ref: TAGS.COACH },
    staff: [{ type: Schema.Types.ObjectId, ref: TAGS.COACH }]
  },
  {
    timestamps: true,
    collation: { locale: LOCALE.EN, strength: 2 },
    collection: TAG,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

const CoachStaff = model<CoachStaff>(TAG, CoachStaffSchema)
export default CoachStaff
