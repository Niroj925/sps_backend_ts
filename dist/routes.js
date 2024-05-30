"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = __importDefault(require("./src/routes/authRoute"));
const doctorRoute_1 = __importDefault(require("./src/routes/doctorRoute"));
const patientRouter_1 = __importDefault(require("./src/routes/patientRouter"));
const predictRoute_1 = __importDefault(require("./src/routes/predictRoute"));
const routes = express_1.default.Router();
routes.use('/auth', authRoute_1.default);
routes.use('/doctor', doctorRoute_1.default);
routes.use('/patient', patientRouter_1.default);
routes.use('/predict', predictRoute_1.default);
exports.default = routes;
