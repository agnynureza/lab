import express from 'express';
import {
  addPlaylist,
  getPlaylists,
  deletePlaylistById,
  addSongPlaylist,
  getSongsInPlaylist,
  deleteSongPlaylist
} from '../controller/playlist-controller.js';
import validate from '../../../middlewares/validate.js';
import authenticateToken from '../../../middlewares/authenticate.js';
import { playlistSchema, songPlaylistSchema } from '../validator/schema.js';

const router = express.Router();

router.post('/', authenticateToken, validate(playlistSchema), addPlaylist);
router.get('/', authenticateToken, getPlaylists);
router.delete('/:id',authenticateToken, deletePlaylistById);

router.post('/:id/songs', authenticateToken, validate(songPlaylistSchema), addSongPlaylist);
router.get('/:id/songs', authenticateToken, getSongsInPlaylist);
router.delete('/:id/songs', authenticateToken, validate(songPlaylistSchema), deleteSongPlaylist);



export default router;