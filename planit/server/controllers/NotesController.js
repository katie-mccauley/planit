import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService";
import BaseController from "../utils/BaseController";

export class NotesController extends BaseController {
  constructor() {
    super('api/projects/:projectId/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createNote)

  }

  async createNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const note = await notesService.createNote(req.body)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }
}