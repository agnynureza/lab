import notes from '../notes/notes.js';
import { nanoid } from 'nanoid';

export const postNote = async (req, res) => {
    const { title = 'untitled', body, tags } = req.body;
    const id = nanoid(16);

    const newNote = { id, title, body, tags };
    notes.push(newNote);

    const isSuccess = notes.some((note) => note.id === id);

    if (isSuccess) {
      return res.status(201).json({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: { noteId: id },
      });
    } else {
      return res.status(500).json({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
      });
    }
};

export const getAllNotes = async (req, res) => {
    return res.status(200).json({
      status: 'success',
      data: { notes },
    });
};

export const getNoteById = async (req, res) => {
    const { id } = req.params;
    const note = notes.find((n) => n.id === id);

    if (note) {
      return res.status(200).json({
        status: 'success',
        data: { note },
      });
    } else {
      return res.status(404).json({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
      });
    }
};

export const editNoteById = async (req, res) => {
    const { id } = req.params;
    const { title, body, tags } = req.body;
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
      notes[index] = {
        ...notes[index],
        title,
        body,
        tags,
      };
      return res.status(200).json({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      });
    } else {
      return res.status(404).json({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
      });
    }
};

export const deleteNoteById = async (req, res) => {
    const { id } = req.params;
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
      notes.splice(index, 1);
      return res.status(200).json({
        status: 'success',
        message: 'Catatan berhasil dihapus',
      });
    } else {
      return res.status(404).json({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
      });
    }
};