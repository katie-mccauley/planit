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

  async deleteTask(projectId, taskId) {
    const res = await api.delete('api/projects/' + projectId + '/tasks/' + taskId)
    logger.log(res.data)
    AppState.tasks = AppState.tasks.filter(t => t.id !== taskId)
  }
}

export const tasksService = new TasksService()