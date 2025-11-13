import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { CLIENT_HOST } from './env.config';
import indexRouter from '../routers/index.router';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [CLIENT_HOST, 'http://127.0.0.1:5173'],
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(indexRouter);
app.use('{*splat}', (req, res) => {
  res.status(404).send('Endpoint with provided method does not exist');
});

export default app;
