import express, { Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import { config } from './config/app.config';
import connectToDatabase from './database/mongodb';
const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({ message: 'Hello from Backend Boilerplate' });
});

app.listen(config.PORT, async () => {
  console.log(
    chalk.green.bold(`Backend Boilerplate API is running on:`),
    chalk.blue.bold.underline(`http://localhost:${config.PORT}`),
    chalk.green.bold(`in ${config.NODE_ENV.toUpperCase()}`),
  );
  await connectToDatabase();
});
