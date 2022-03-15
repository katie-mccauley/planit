import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
class SprintsService {
  async getSprints(id) {
    const sprints = await dbContext.Sprints.find(id).populate('creator')
    return sprints
  }
  async create(body) {
    const sprints = await dbContext.Projects.findById(body.projectId)
    if (sprints.creatorId.toString() !== body.creatorId) {
      throw new BadRequest('you can not create a sprint that isnt yours')
    }
    const sprint = await dbContext.Sprints.create(body)
    await sprint.populate('creator')
    return sprint
  }

  async deleteSprint(sprintId, creatorId) {
    const original = await dbContext.Sprints.findById(sprintId).populate('creator')
    if (original.creatorId.toString() !== creatorId) {
      throw new BadRequest('can not delete the sprint, since its not yours')
    }
    await original.remove()
    return original
  }

}

export const sprintsService = new SprintsService()