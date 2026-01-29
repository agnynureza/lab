import { Router } from 'express';
import { postNote, getAllNotes, getNoteById, editNoteById, deleteNoteById } from '../notes/controller.js';

const router = Router();

router.post('/notes', postNote);
router.get('/notes', getAllNotes);
router.get('/notes/:id', getNoteById);
router.put('/notes/:id', editNoteById);
router.delete('/notes/:id', deleteNoteById);

export default router;