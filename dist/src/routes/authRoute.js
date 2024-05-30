"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controller/authController"));
const validateToken_1 = require("../middleware/validateToken");
const authController = new authController_1.default();
const router = (0, express_1.Router)();
router.post('/create/admin', (req, res) => authController.createAdmin(req, res));
router.post('/create', validateToken_1.validateAT, (req, res) => authController.createAccount(req, res));
router.post('/login', (req, res) => authController.login(req, res));
router.post('/otp', (req, res) => authController.generateOtp(req, res));
router.post('/password/reset', (req, res) => authController.resetPass(req, res));
router.patch('/update/email/:id', (req, res) => authController.updateEmail(req, res));
router.delete('/delete/:id', (req, res) => authController.deleteAuth(req, res));
exports.default = router;
