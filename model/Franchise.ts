import mongoose, { Schema, model } from 'mongoose'
import slugify from 'slugify'
import goodlog from 'good-logs'
import { TAGS, LOCALE } from 'constant'

const TAG = TAGS.FRANCHISE

const FranchiseSchema: Schema<Franchise> = new Schema<Franchise>(
  {
    apiCode: { type: String, required: true },
    league: { type: Schema.Types.ObjectId, ref: TAGS.LEAGUE },
    ownership: [{ type: String }],
    team: { type: Schema.Types.ObjectId, ref: TAGS.TEAM },
    teamCity: { type: String },
    teamName: { type: String },
    teamAbbreviation: { type: String },
    founded: { type: String },
    history: { type: String },
    arena: { type: String },
    years: { type: Number },
    games: { type: Number },
    wins: { type: Number },
    losses: { type: Number },
    winPercentage: { type: Number },
    playoffAppearances: { type: Number },
    divisionTitles: { type: Number },
    conferenceTitles: { type: Number },
    championships: { type: Number },
    affliation: { type: String },
    teamHistory: [{ type: Object }]
  },
  {
    timestamps: true,
    collation: { locale: LOCALE.EN, strength: 2 },
    collection: TAG,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

FranchiseSchema.virtual('slug').get(function () {
  return slugify(this.teamName, { lower: true })
})

FranchiseSchema.pre('save', function (next) {
  goodlog.log(`${TAGS.FRANCHISE} pre save hook`)
  next()
})

FranchiseSchema.post('save', function (doc) {
  goodlog.log(`${TAGS.FRANCHISE} post save hook`)
})

// FranchiseSchema.index({ teamName: 1 }, { unique: true })
const Franchise = model<Franchise>(TAG, FranchiseSchema)

export default Franchise
