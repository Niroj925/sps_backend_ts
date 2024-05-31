"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const doctorController_1 = __importDefault(require("../controller/doctorController"));
const express_1 = require("express");
const validateToken_1 = require("../middleware/validateToken");
const doctorController = new doctorController_1.default();
const router = (0, express_1.Router)();
router.post("/create/profile", validateToken_1.validateAT, (req, res) => doctorController.createProfile(req, res));
router.post("/rate/:id", (req, res) => doctorController.addRating(req, res));
router.get("", (req, res) => doctorController.getDoctors(req, res));
router.get("/all", validateToken_1.validateAT, (req, res) => doctorController.getAuthDoctors(req, res));
router.get("/:userId", (req, res) => doctorController.getDoctor(req, res));
router.get("/rate/:doctorId", (req, res) => doctorController.getDoctorRatings(req, res));
router.delete("/delete/:id", validateToken_1.validateAT, (req, res) => doctorController.deleteDoctor(req, res));
exports.default = router;
