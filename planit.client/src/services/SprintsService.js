import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class SprintsService {

  async getAllSprints(id) {
    const res = await api.get('api/projects/' + id + '/sprints')
    logger.log(res.data)
    AppState.sprints = res.data
  }

  async createSprint(newSprint) {
    const res = await api.post('api/projects/' + newSprint.projectId + '/sprints', newSprint)
    logger.log(res.data)
    AppState.sprints.push(res.data)
  }

  async deleteSprint(id, sprintId) {
    const res = await api.delete('api/projects/' + id + '/sprints/' + sprintId)
    logger.log(res.data)
    AppState.sprints = AppState.sprints.filter(s => s.id !== sprintId)
  }

}
export const sprintsService = new SprintsService()