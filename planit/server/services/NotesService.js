import { dbContext } from "../db/DbContext"

class NotesService {
  async createNote(body) {
    const note = await dbContext.Notes.create(body)
    await note.populate('creator')
    return note
  }

}

export const notesService = new NotesService()