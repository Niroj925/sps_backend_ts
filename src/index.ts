
import express from 'express';
import { AppDataSource } from './config/db.config';
import routes from '../routes';
import specs from '../swagger';
import swaggerUi from 'swagger-ui-express'
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './exception/errorMiddleware';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin:["http://localhost:3000"],
  credentials:true
}));
app.get('/', (req, res) => {
  res.send('Hello,Nepal');
});
app.use(routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use(errorHandler);
app.listen(process.env.PORT||4000, () => {
    AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    });
  console.log(`Server is running `);
});