import { Schema, model } from 'mongoose'
import { TAGS, LOCALE } from 'constant'

const TAG = TAGS.ROLE

const RoleSchema: Schema<Role> = new Schema<Role>(
  {
    apiCode: { type: String },
    role: { type: String, unique: true, required: true },
    level: { type: Number },
    description: { type: String },
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

const Role = model<Role>(TAG, RoleSchema)
export default Role
