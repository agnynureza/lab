import { Router } from 'express';
import { login, refreshToken, logout } from '../controller/auth-controller.js';
import validate from '../../../middlewares/validate.js';
import {
  userPayloadSchema, 
  putAuthenticationPayloadSchema,
  deleteAuthenticationPayloadSchema
} from '../validator/schema.js';
 
const router = Router();
 
router.post('/', validate(userPayloadSchema), login);
router.put('/', validate(putAuthenticationPayloadSchema), refreshToken);
router.delete('/', validate(deleteAuthenticationPayloadSchema), logout);
 
export default router;