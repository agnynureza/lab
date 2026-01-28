import { nanoid } from "nanoid";
import InvariantError from "../../../exceptions/invariant-error.js";
import response from "../../../utils/response.js";
import NotFoundError from "../../../exceptions/not-found-error.js";
import NoteRepositories from "../repositories/note-repositories.js";
import AuthorizationError from "../../../exceptions/authorization-error.js";

export const createNote = async (req, res, next) => {
  const { title = "untitled", tags, body } = req.validated;
  const { id: owner } = req.user;
  const ts = new Date().toISOString();

  const note = await NoteRepositories.createNote({
    title,
    tags,
    body,
    owner,
    createdAt: ts,
    updatedAt: ts,
  });

  if (!note) {
    return next(new InvariantError("Catatan gagal ditambahkan"));
  }

  return response(res, 201, "Catatan berhasil ditambahkan", { noteId: note.id });
};

export const getNotes = async (req, res) => {
  const { id: owner } = req.user;
  const notes = await NoteRepositories.getNotes(owner);

  return response(res, 200, "Berhasil mengambil catatan", { notes });
};

export const getNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const isOwner = await NoteRepositories.verifyNoteOwner(id, owner);
  if (!isOwner) {
    return next(
      new AuthorizationError("Anda tidak berhak mengakses resource ini")
    );
  }

  const note = await NoteRepositories.getNoteById(id);
  if (!note) {
    return next(new NotFoundError("Catatan tidak ditemukan"));
  }

  return response(res, 200, "Berhasil mengambil catatan", { note });
};

export const editNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { title, tags, body } = req.validated;
  const { id: owner } = req.user;

  const isOwner = await NoteRepositories.verifyNoteOwner(id, owner);
  if (!isOwner) {
    return next(
      new AuthorizationError("Anda tidak berhak mengakses resource ini")
    );
  }

  const note = await NoteRepositories.editNote({
    id,
    title,
    body,
    tags,
  });
  if (!note) {
    return next(new NotFoundError("Catatan tidak ditemukan"));
  }

  return response(res, 200, "Catatan berhasil diperbarui", note);
};

export const deleteNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const isOwner = await NoteRepositories.verifyNoteOwner(id, owner);
  if (!isOwner) {
    return next(
      new AuthorizationError("Anda tidak berhak mengakses resource ini")
    );
  }

  const note = await NoteRepositories.deleteNote(id);
  if (!note) {
    return next(new NotFoundError("Catatan tidak ditemukan"));
  }

  return response(res, 200, "Catatan berhasil dihapus", note);
};
