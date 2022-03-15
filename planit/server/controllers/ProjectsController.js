import { Auth0Provider } from "@bcwdev/auth0provider";
import { projectsService } from "../services/ProjectsService";
import { sprintsService } from "../services/SprintsService";
import BaseController from "../utils/BaseController";

export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/sprints', this.getSprints)
      .post('', this.create)
      .delete('/:id', this.deleteProject)


  }

  async getAll(req, res, next) {
    try {
      const projects = await projectsService.getAll(req.query)
      return res.send(projects)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const project = await projectsService.getOne(req.params.id)
      return res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async getSprints(req, res, next) {
    try {
      const sprints = await sprintsService.getSprints({ projectId: req.params.id })
      return res.send(sprints)
    } catch (error) {
      next(error)
    }
  }


  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const create = await projectsService.create(req.body)
      return res.send(create)
    } catch (error) {
      next(error)
    }
  }

  async deleteProject(req, res, next) {
    try {
      const userId = req.userInfo.id
      const projectId = req.params.id
      const message = await projectsService.deleteProject(projectId, userId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}