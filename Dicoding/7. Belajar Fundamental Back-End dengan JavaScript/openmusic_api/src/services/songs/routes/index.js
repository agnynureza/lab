import express from 'express';
import {
  createSong,
  getSongs,
  getSongById,
  editSongById,
  deleteSongById
} from '../controller/song-controller.js';
import validate from '../../../middlewares/validate.js';

import { songPayloadSchema, songUpdatePayloadSchema } from '../validator/schema.js';

const router = express.Router();

router.post('/', validate(songPayloadSchema), createSong);
router.get('/', getSongs);
router.get('/:id', getSongById);
router.put('/:id', validate(songUpdatePayloadSchema), editSongById);
router.delete('/:id', deleteSongById);

export default router;