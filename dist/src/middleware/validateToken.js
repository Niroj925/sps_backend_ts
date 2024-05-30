"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRT = exports.validateAT = void 0;
const jwt = __importStar(require("jsonwebtoken"));
require('dotenv').config();
const validateRT = (req, res, next) => {
    const token = req.headers.token;
    // console.log(token);
    if (!token) {
        return res.status(403).json({ success: false, message: "Token not provided" });
    }
    try {
        if (!process.env.RT_SECRET) {
            throw new Error('not found');
        }
        const decoded = jwt.verify(token, process.env.RT_SECRET);
        req.user = decoded; // Set the userId property on the req object
        next();
    }
    catch (err) {
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
};
exports.validateRT = validateRT;
const validateAT = (req, res, next) => {
    const token = req.headers.token;
    // console.log(token);
    if (!token) {
        return res.status(403).json({ success: false, message: "Token not provided" });
    }
    try {
        if (!process.env.AT_SECRET) {
            throw new Error('not found');
        }
        const decoded = jwt.verify(token, process.env.AT_SECRET);
        req.user = decoded; // Set the userId property on the req object
        next();
    }
    catch (err) {
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
};
exports.validateAT = validateAT;
