
import express from 'express';
import { AppDataSource } from './config/db.config';
import routes from '../routes';
import specs from '../swagger';
import swaggerUi from 'swagger-ui-express'
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello,Nepal');
});
app.use(routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.listen(port, () => {
    AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    });
  console.log(`Server is running on http://localhost:${port}`);
});