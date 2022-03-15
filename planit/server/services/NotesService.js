import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class NotesService {

  async getAllNotes(query = {}) {
    const notes = await dbContext.Notes.find(query).populate('creator')
    return notes
  }

  async createNote(body) {
    const note = await dbContext.Notes.create(body)
    await note.populate('creator')
    return note
  }

  async deleteNote(noteId, creatorId) {
    const original = await dbContext.Notes.findById(noteId).populate('creator')
    if (original.creatorId.toString() !== creatorId) {
      throw new BadRequest('can not delete the note because, it is not yours')
    }
    await original.remove()
    return original
  }


}

export const notesService = new NotesService()