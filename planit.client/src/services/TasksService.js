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

  // async editTask(editTask){
  //   const res = await api.put('api/projects' + editTask.projectId + '/tasks/' + )
  // }

  async moveTask(editedTask) {
    const res = await api.put('api/projects/' + editedTask.projectId + '/tasks/' + editedTask.id, editedTask)
    logger.log('edit task res', res.data)
  }

  async checked(task, projectId) {
    task.isComplete = !task.isComplete
    const res = await api.put('api/projects/' + projectId + '/tasks/' + task.id, task)
    logger.log("checked box", res.data)
    const foundTask = AppState.tasks.findIndex(t => t.id == task.id)
    AppState.tasks.splice(foundTask, 1, res.data)
    // logger.log(task.isComplete)
  }
}

export const tasksService = new TasksService()