import express from 'express';
import {
  createAlbum,
  getAlbumById,
  editAlbumById,
  deleteAlbumById,
  uploadCover,
  addLikes,
  delLikes,
  getLikes
} from '../controller/album-controller.js';
import validate from '../../../middlewares/validate.js';
import { albumPayloadSchema, albumUpdatePayloadSchema } from '../validator/schema.js';
import { upload } from '../storage/storage-config.js'
import authenticateToken from '../../../middlewares/authenticate.js';

const router = express.Router();

router.post('/', validate(albumPayloadSchema), createAlbum);
router.get('/:id', getAlbumById);
router.put('/:id', validate(albumUpdatePayloadSchema), editAlbumById);
router.delete('/:id', deleteAlbumById);
router.post('/:id/covers', upload.single('cover'), uploadCover)
router.post('/:id/likes', authenticateToken, addLikes)
router.delete('/:id/likes', authenticateToken, delLikes)
router.get('/:id/likes', getLikes)

export default router;