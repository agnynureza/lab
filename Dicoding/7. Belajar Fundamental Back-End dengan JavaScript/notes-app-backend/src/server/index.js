import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import routes from '../routes/index.js';
import errorHandler from '../middlewares/error.js';
 
const app = express();
 
app.use(express.json());
app.use('/uploads', express.static('src/services/uploads/files/images'));
app.use(routes);
app.use(errorHandler)
 
export default app;