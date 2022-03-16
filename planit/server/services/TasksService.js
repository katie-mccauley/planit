import { dbContext } from "../db/DbContext"
import { ProjectSchema } from "../models/Project"
import { BadRequest, Forbidden } from "../utils/Errors"

class TasksService {
  async getAllTasks(id) {
    const task = await dbContext.Tasks.find(id).populate('creator')
    return task
  }

  async createTask(body) {
    const tasks = await dbContext.Projects.findById(body.projectId)
    if (tasks.creatorId.toString() !== body.creatorId) {
      throw new BadRequest('this is not your task')
    }
    const task = await dbContext.Tasks.create(body)
    await task.populate('creator')
    return task
  }

  async editTask(taskId, update) {
    const original = await dbContext.Tasks.findById(taskId)
    if (original.creatorId.toString() !== update.creatorId) {
      throw new BadRequest('Cant edit the task')
    }
    original.name = update.name ? update.name : original.name
    original.weight = update.weight != null ? update.weight : original.weight
    original.sprintId = update.sprintId ? update.sprintId : original.sprintId
    original.isComplete = update.isComplete != null ? update.isComplete : original.isComplete

    await original.save()
    await original.populate('creator')
    return original

  }

  async deleteTask(taskId, creatorId) {
    const original = await dbContext.Tasks.findById(taskId).populate('creator')
    if (original.creatorId.toString() !== creatorId) {
      throw new BadRequest("Can not delete this task, need to be a real person")
    }
    await original.remove()
    return original
  }

}

export const tasksService = new TasksService()