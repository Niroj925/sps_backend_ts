
import express from 'express';
import authRoute from './src/routes/authRoute'; 
import doctorRoute from './src/routes/doctorRoute';
import patientRoute from './src/routes/patientRouter';
import predictRoute from './src/routes/predictRoute';

const routes = express.Router();

routes.use('/auth',authRoute);
routes.use('/doctor',doctorRoute);
routes.use('/patient',patientRoute);
routes.use('/predict',predictRoute);

export default routes;
