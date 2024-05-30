"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const patient_entity_1 = require("../entity/patient.entity");
const db_config_1 = require("../config/db.config");
const doctor_entity_1 = require("../entity/doctor.entity");
class PatientController {
    constructor() {
        this.patientRepository = db_config_1.AppDataSource.getRepository(patient_entity_1.Patient),
            this.doctorRepository = db_config_1.AppDataSource.getRepository(doctor_entity_1.Doctor);
    }
    createAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, contact, email, stroke } = req.body;
                const { id } = req.params;
                const newPatient = yield this.patientRepository.save({
                    name,
                    contact,
                    email,
                    stroke,
                    prescription: '',
                    doctorId: id
                });
                const doctor = yield this.doctorRepository.findOne({
                    where: { id }
                });
                if (doctor) {
                    doctor.visitPatient += 1;
                    yield this.doctorRepository.save(doctor);
                }
                // await client.del('patients')
                res.status(200).json(newPatient);
            }
            catch (error) {
                console.error('Error creating admin:', error);
                res.status(403).json({ error });
            }
        });
    }
    getAllPatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patients = yield this.patientRepository.find();
                res.status(200).json(patients);
            }
            catch (err) {
                console.log(err);
                res.status(403).json({ err });
            }
        });
    }
    getDoctorPatients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                // const cachedValue=await client.get('patients');
                //   if(cachedValue){
                //     return res.status(200).json(JSON.parse (cachedValue));
                //  }
                const patients = yield this.patientRepository.find({ where: { doctor: { id } } });
                // await client.set('patients',JSON.stringify(doctor));
                // await  client.expire('patients',20)//expire after 10 minutes
                res.status(200).json(patients);
            }
            catch (err) {
                console.log(err);
                res.status(403).json({ err });
            }
        });
    }
    getPateint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const patients = yield this.patientRepository.findOne({
                    where: {
                        id
                    }
                });
                res.status(200).json(patients);
            }
            catch (err) {
                console.log(err);
                res.status(403).json({ err });
            }
        });
    }
    updatePrescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { prescription } = req.body;
            try {
                const patient = yield this.patientRepository.findOne({ where: { id } });
                patient && (patient.prescription = prescription,
                    yield this.doctorRepository.save(patient));
                res.status(200).json(patient);
            }
            catch (err) {
                console.log(err);
                res.status(403).json({ err });
            }
        });
    }
    deletePatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield this.patientRepository.delete({ id });
                if (data) {
                    // await client.del('patients')
                    res.status(200).json({ success: true, msg: "patient deleted" });
                }
                else {
                    res.status(403).json({ success: false, msg: "unable to delete" });
                }
            }
            catch (err) {
                console.log(err);
                res.status(403).json({ err });
            }
        });
    }
}
exports.default = PatientController;
