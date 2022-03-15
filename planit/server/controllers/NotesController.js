import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService";
import BaseController from "../utils/BaseController";

export class NotesController extends BaseController {
  constructor() {
    super('api/projects/:projectId/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllNotes)
      .post('', this.createNote)
      .delete('/:noteId', this.deleteNote)

  }


  async getAllNotes(req, res, next) {
    try {
      const notes = await notesService.getAllNotes(req.query)
      return res.send(notes)
    } catch (error) {
      next(error)
    }
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

  async deleteNote(req, res, next) {
    try {
      const creatorId = req.userInfo.id
      const noteId = req.params.noteId
      const note = await notesService.deleteNote(noteId, creatorId)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }
}