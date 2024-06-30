import { Schema, model } from 'mongoose'
import { TAGS, LOCALE } from 'constant'

const TAG = TAGS.ROSTER

const RosterSchema: Schema<Roster> = new Schema<Roster>(
  {
    record: { type: Schema.Types.ObjectId, ref: TAGS.RECORD },
    season: { type: Schema.Types.ObjectId, ref: TAGS.SEASON },
    playbook: { type: Schema.Types.ObjectId, ref: TAGS.PLAYBOOK },
    team: { type: Schema.Types.ObjectId, ref: TAGS.TEAM },
    players: [{ type: Schema.Types.ObjectId, ref: TAGS.PLAYER }],
    coachStaff: { type: Schema.Types.ObjectId, ref: TAGS.COACH_STAFF }
  },
  {
    timestamps: true,
    collation: { locale: LOCALE.EN, strength: 2 },
    collection: TAG,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

const Roster = model<Roster>(TAG, RosterSchema)
export default Roster
