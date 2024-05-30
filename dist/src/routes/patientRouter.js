"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientController_1 = __importDefault(require("../controller/patientController"));
const express_1 = require("express");
const validateToken_1 = require("../middleware/validateToken");
// import validateToken from "../middleware/validateToken.js";
const patientController = new patientController_1.default();
const router = (0, express_1.Router)();
router.post("/create/:id", (req, res) => patientController.createAccount(req, res));
router.get('', (req, res) => patientController.getAllPatient(req, res));
router.get('/:id', (req, res) => patientController.getDoctorPatients(req, res));
router.get('/fetch/:id', (req, res) => patientController.getPateint(req, res));
router.patch('/:id', validateToken_1.validateAT, (req, res) => patientController.updatePrescription(req, res));
router.delete('/delete/:id', validateToken_1.validateAT, (req, res) => patientController.deletePatient(req, res));
exports.default = router;
