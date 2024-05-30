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
const doctor_entity_1 = require("../entity/doctor.entity");
const db_config_1 = require("../config/db.config");
class DoctorController {
    constructor() {
        this.doctorRepository = db_config_1.AppDataSource.getRepository(doctor_entity_1.Doctor);
    }
    createProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { name, contact, hospital, description } = req.body;
            const { id } = req.params;
            const user = req.user;
            // console.log(id);
            try {
                // Create a new doctor
                const doctorProfile = yield this.doctorRepository.save({
                    name,
                    contact,
                    email: user.jwtPayload.email,
                    ratingCount: 0,
                    ratings: 0,
                    visitPatient: 0,
                    hospital,
                    description,
                    userId: user.jwtPayload.sub
                });
                //   console.log('New Doctor created:', newDoctor.toJSON()); 
                // await client.del('doctors')
                res.status(200).json(doctorProfile);
            }
            catch (error) {
                console.error('Error creating doctor:', error);
                res.status(403).json({ error });
            }
        });
    }
    getDoctors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const cachedValue = await client.get('doctors');
                // if (cachedValue) {
                //     return res.status(200).json(JSON.parse(cachedValue));
                // }
                const doctor = yield this.doctorRepository.find();
                // await client.set('doctors', JSON.stringify(doctor));
                // await client.expire('doctors', 20)//expire after 10 minutes
                // console.log('cached not found');
                res.status(200).json(doctor);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const doctor = yield this.doctorRepository.findOne({ where: { id: userId } });
                if (doctor) {
                    res.status(200).json(doctor);
                }
                else {
                    res.status(403).json({ msg: 'doctor not found' });
                }
            }
            catch (err) {
                console.log(err);
                res.status(403).json({ err });
            }
        });
    }
    addRating(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { rating } = req.body;
            try {
                // Find the doctor by ID
                const doctorInfo = yield this.doctorRepository.findOne({ where: { id } });
                if (!doctorInfo) {
                    return res.status(403).json({ msg: 'not found' });
                }
                const tr = doctorInfo.ratings + rating;
                const rc = doctorInfo.ratingCount + 1;
                const doctor = yield this.doctorRepository.update(id, { ratings: tr, ratingCount: rc });
                if (!doctor) {
                    return res.status(404).json({ message: "Doctor not found" });
                }
                return res.status(200).json({ success: true, msg: 'rated' });
            }
            catch (error) {
                console.error("Error adding rating:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    getDoctorRatings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { doctorId } = req.params;
            try {
                // Find the doctor by ID
                const doctor = yield this.doctorRepository.findOne({ where: { id: doctorId } });
                if (!doctor) {
                    return res.status(404).json({ message: "Doctor not found" });
                }
                // Extract and return the ratings of the doctor
                const ratings = doctor.ratings / doctor.ratingCount;
                return res.status(200).json({ rating: ratings.toFixed(2) });
            }
            catch (error) {
                console.error("Error fetching doctor ratings:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
        });
    }
    deleteDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const data = yield this.doctorRepository.delete({ id });
                if (data) {
                    // await client.del('doctors')
                    res.status(200).json({ success: true, msg: "doctor deleted" });
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
exports.default = DoctorController;
