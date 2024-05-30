"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const predictController_1 = __importDefault(require("../controller/predictController"));
const express_1 = require("express");
const predictController = new predictController_1.default();
const router = (0, express_1.Router)();
router.post("/result", predictController.result);
router.get('/accuracy', predictController.accuracy);
exports.default = router;
