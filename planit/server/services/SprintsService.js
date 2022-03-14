import { dbContext } from "../db/DbContext"
class SprintsService {
  async create(body) {
    const sprint = await dbContext.Sprints.create(body)
    await sprint.populate('creator')
    return sprint
  }

}

export const sprintsService = new SprintsService()