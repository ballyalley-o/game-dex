import slugify from 'slugify'
import goodlog from 'good-logs'
import mongoose, { Schema, model } from 'mongoose'

const TAG = 'Player'

const PlayerSchema: Schema<Player> = new Schema<Player>({
  apiCode: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  fullname: { type: String },
  birthDate: { type: Date },
  birthPlace: { type: String },
  college: { type: String },
  height: { type: String },
  weight: { type: Number },
  position: { type: String },
  nickname: { type: [String] }
})
