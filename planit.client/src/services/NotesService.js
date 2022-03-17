import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"

class NotesService {

  async getAllNotes(id) {
    const res = await api.get('api/projects/' + id + '/notes')
    logger.log("this is all notes", res.data)
    AppState.notes = res.data
  }
  async createNote(newNote) {
    const res = await api.post('api/projects/' + newNote.projectId + '/notes', newNote)
    logger.log("creatiyng note", res.data)
    AppState.notes.push(res.data)
  }

  async deleteNote(projectId, noteId) {
    const res = await api.delete('api/projects/' + projectId + '/notes/' + noteId)
    logger.log(res.data)
    AppState.notes = AppState.notes.filter(n => n.id !== noteId)
  }

}

export const notesService = new NotesService()