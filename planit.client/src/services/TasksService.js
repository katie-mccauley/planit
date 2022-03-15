import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TasksService {
  async getAllTasks(id) {
    const res = await api.get('api/projects/' + id + '/tasks')
    logger.log('this is tasks', res.data)
    AppState.tasks = res.data
  }
  async createTask(newTask) {
    const res = await api.post('api/projects/' + newTask.projectId + '/tasks', newTask)
    logger.log("creating a task", res.data)
    AppState.tasks.push(res.data)
  }
}

export const tasksService = new TasksService()