
import PatientController from "../controller/patientController";
import { Router } from "express";
import { validateAT } from "../middleware/validateToken";
// import validateToken from "../middleware/validateToken.js";

const patientController=new PatientController();

const router=Router();

router.post("/create/:id",(req, res) =>patientController.createAccount(req,res));
router.get('', (req, res) =>patientController.getAllPatient(req,res));
router.get('/:id',(req, res) =>patientController.getDoctorPatients(req,res));
router.get('/fetch/:id',(req, res) =>patientController.getPateint(req,res));
router.patch('/:id',validateAT,(req, res) =>patientController.updatePrescription(req,res));
router.delete('/delete/:id',validateAT,(req, res) =>patientController.deletePatient(req,res));

export default router;