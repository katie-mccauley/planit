import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProjectsService {

  async getAllProjects(query = {}) {
    const res = await api.get('api/projects/', { params: query })
    logger.log(res.data)
    AppState.projects = res.data
  }

  async getProjectById(id) {
    const res = await api.get('api/projects/' + id)
    logger.log("this is get by id", res.data)
    AppState.activeProject = res.data
  }

  async createProject(body) {
    const res = await api.post('api/projects/', body)
    logger.log(res.data)
    AppState.projects.push(res.data)
    return res.data.id
  }

  async deleteProject(id) {
    const res = await api.delete('api/projects/' + id)
    logger.log(res.data)
    AppState.projects = AppState.projects.filter(p => p.id !== id)

  }
}

export const projectsService = new ProjectsService()