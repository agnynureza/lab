import { Router } from 'express';
import { exportPlaylist } from '../controller/export-controller.js';
import authenticateToken from '../../../middlewares/authenticate.js';
import validate from '../../../middlewares/validate.js';
import { exportPayloadSchema } from '../validator/schema.js';
 
const router = Router();
 
router.post('/playlists/:playlistId', authenticateToken, validate(exportPayloadSchema),  exportPlaylist);
 
export default router;