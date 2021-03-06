import { Auth0Provider } from "@bcwdev/auth0provider";
import { sprintsService } from "../services/SprintsService";
import BaseController from "../utils/BaseController";

export class SprintsController extends BaseController {
  constructor() {
    super('api/projects/:id')
    this.router

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/sprints', this.create)
      .delete('/sprints/:sprintId', this.deleteSprint)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.id
      const sprint = await sprintsService.create(req.body)
      return res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async deleteSprint(req, res, next) {
    try {
      const creatorId = req.userInfo.id
      const sprintId = req.params.sprintId
      const message = await sprintsService.deleteSprint(sprintId, creatorId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}