import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProjectsService {

  async getAllProjects(query = {}) {
    const res = await api.get('api/projects/', { params: query })
    logger.log(res.data)
    AppState.projects = res.data
  }
}

export const projectsService = new ProjectsService()