import 'dotenv/config';
import express from 'express';
import notes from './api/notes/routes.js';
import loggingMiddleware from './logger/middleware.js';

const app = express();
const port = 3000;

app.use(loggingMiddleware);
app.use(express.json());
app.use('/', notes);


app.listen(port, () => {
  console.log(`server start at http://localhost:${port}`);
});