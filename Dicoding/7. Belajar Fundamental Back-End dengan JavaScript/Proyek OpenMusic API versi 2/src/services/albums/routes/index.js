import express from 'express';
import {
  createAlbum,
  getAlbumById,
  editAlbumById,
  deleteAlbumById
} from '../controller/album-controller.js';
import validate from '../../../middlewares/validate.js';

import { albumPayloadSchema, albumUpdatePayloadSchema } from '../validator/schema.js';

const router = express.Router();

router.post('/', validate(albumPayloadSchema), createAlbum);
router.get('/:id', getAlbumById);
router.put('/:id', validate(albumUpdatePayloadSchema), editAlbumById);
router.delete('/:id', deleteAlbumById);

export default router;