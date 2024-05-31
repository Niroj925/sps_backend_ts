
import DoctorController from "../controller/doctorController";
import { Router } from "express";
import { validateAT } from "../middleware/validateToken";


const doctorController=new DoctorController();

const router=Router();

router.post("/create/profile",validateAT,(req, res) =>doctorController.createProfile(req,res));
router.post("/rate/:id",(req, res) =>doctorController.addRating(req,res));
router.get("",(req, res) =>doctorController.getDoctors(req,res));
router.get("/all",validateAT,(req, res) =>doctorController.getAuthDoctors(req,res));
router.get("/:userId",(req, res) =>doctorController.getDoctor(req,res));
router.get("/rate/:doctorId",(req, res) =>doctorController.getDoctorRatings(req,res));
router.delete("/delete/:id",validateAT,(req, res) =>doctorController.deleteDoctor(req,res));

export default router;