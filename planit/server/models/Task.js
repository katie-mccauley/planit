import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TasksSchema = new Schema(
  {
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    sprintId: { type: Schema.Types.ObjectId, ref: 'Sprint', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    isComplete: { type: Boolean, default: false, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TasksSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})