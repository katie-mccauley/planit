import { Auth0Provider } from "@bcwdev/auth0provider";
import { tasksService } from "../services/TasksService";
import BaseController from "../utils/BaseController";

export class TasksController extends BaseController {
  constructor() {
    super('api/projects/:projectId/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllTasks)
      .post('', this.createTask)
    // .put('/:taskId', this.editTask)
  }

  async getAllTasks(req, res, next) {
    try {
      const tasks = await tasksService.getAllTasks({ projectId: req.params.projectId })
      return res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const task = await tasksService.createTask(req.body)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  // async editTask(req, res, next){
  //   try {

  //   } catch (error) {
  //     next(error)
  //   }
  // }

}