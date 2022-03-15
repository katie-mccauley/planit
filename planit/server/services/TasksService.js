import { dbContext } from "../db/DbContext"

class TasksService {
  async getAllTasks(id) {
    const task = await dbContext.Tasks.find(id).populate('creator')
    return task
  }

  async createTask(body) {
    const task = await dbContext.Tasks.create(body)
    await task.populate('creator')
    return task
  }

}

export const tasksService = new TasksService()