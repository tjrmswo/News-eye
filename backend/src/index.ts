import express, { Request, Response, json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './routers/userRoute';
import newsRoute from './routers/newsRoute';

// env
dotenv.config();

const app: express.Application = express();
const port: number = 4000;

app.use(
  cors({
    origin: [process.env.LOCAL_ADDRESS as string],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(cors());

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(morgan('dev'));

app.get('/', (_request: Request, response: Response) => {
  response.send(`App is listening on port ${port}`);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}! \n`);
});

// 라우터 설정
app.use('/api', userRoute, newsRoute);
