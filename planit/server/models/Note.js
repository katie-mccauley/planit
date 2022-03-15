import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const NotesSchema = new Schema(
  {
    body: { type: String, required: true },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

NotesSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})
