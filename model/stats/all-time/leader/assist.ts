import { Model, Schema } from 'mongoose'
import goodlog from 'good-logs'
import { KEY } from 'constant'

const TAG = KEY.ASSIST_LEADER

const AllTimeAssistLeadersSchema: Schema<AllTimeAssistLeaders> = new Schema<AllTimeAssistLeaders>({
  player: {
    type: Schema.Types.ObjectId,
    required: true
  },
  assist: {
    type: Number,
    required: true
  },
  apiCode: {
    type: String,
    required: true
  }
})
