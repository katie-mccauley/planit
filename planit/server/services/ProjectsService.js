import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { logger } from "../utils/Logger"
class ProjectsService {

  async getAll(query = {}) {
    const projects = await dbContext.Projects.find(query).populate('creator', 'name')
    return projects
  }

  async getOne(id) {
    const project = await dbContext.Projects.findById(id).populate('creator', 'name')
    if (!project) {
      throw new BadRequest('Unable to find')
    }
    return project
  }
  async create(body) {
    const project = await dbContext.Projects.create(body)
    await project.populate('creator', 'name picture')
    return project
  }

  async deleteProject(projectId, userId) {
    const original = await this.getOne(projectId)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest("this is not authorized ")
    }
    await original.remove()
    return original
  }

}

export const projectsService = new ProjectsService()