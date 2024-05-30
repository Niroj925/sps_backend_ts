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
const argon = __importStar(require("argon2"));
const db_config_1 = require("../config/db.config");
const auth_entity_1 = require("../entity/auth.entity");
const type_1 = require("../helper/type/type");
const token_1 = require("../helper/utils/token");
let previousOtp = null;
let AuthEmail = null;
class AuthController {
    constructor() {
        this.AuthRepository = db_config_1.AppDataSource.getRepository(auth_entity_1.Auth);
    }
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const admin = yield this.AuthRepository.find({ where: { role: type_1.roleType.admin } });
                if (admin.length > 0) {
                    throw new Error('admin already exist');
                }
                const hashedPassword = yield argon.hash(password);
                const newAuth = yield this.AuthRepository.save({
                    email,
                    password: hashedPassword,
                    role: type_1.roleType.admin
                });
                res.status(200).json(newAuth);
            }
            catch (error) {
                console.error("Error creating Auth:", error);
                res.status(403).json({ error });
            }
        });
    }
    createAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = req.user;
            console.log(user);
            const hashedPassword = yield argon.hash(password);
            const admin = yield this.AuthRepository.find({ where: { role: type_1.roleType.admin } });
            try {
                const newAuth = yield this.AuthRepository.save({
                    email,
                    password: hashedPassword,
                    role: type_1.roleType.doctor
                });
                res.status(200).json(newAuth);
            }
            catch (error) {
                console.error("Error creating Auth:", error);
                res.status(403).json({ error });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req.body);
            const { email, password } = req.body;
            try {
                const user = yield this.AuthRepository.findOne({ where: { email } });
                if (!user) {
                    res.status(403).json({ msg: 'invalid credentials' });
                }
                const match = yield argon.verify(user.password, password);
                if (match) {
                    const payload = {
                        sub: user.id,
                        email: user.email,
                        role: user.role
                    };
                    const token = new token_1.Token();
                    const accessToken = yield token.generateAcessToken(payload);
                    const refreshToken = yield token.generateRefreshToken(payload);
                    res.status(200).json({ token: { accessToken, refreshToken } });
                }
                else {
                    res.status(403).json({ msg: 'invalid credentials' });
                }
            }
            catch (err) {
                console.log(err);
                res.status(403).json({ err });
            }
        });
    }
    generateOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            console.log(email);
            try {
                const isEmailExist = yield this.AuthRepository.findOne({
                    where: { email },
                });
                console.log(isEmailExist);
                if (isEmailExist) {
                    AuthEmail = email;
                    previousOtp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
                    const msg = `  <p> Reset your password with this OTP.</p>
                  <h3> OTP:${previousOtp}</h3>
                  <p>  Don't share this otp to others.</P>
                  <p> Thank you.</p>
                     `;
                    console.log(msg);
                    //   sendMail(email, 'Password Reset', msg);
                    setTimeout(() => {
                        AuthEmail = null;
                        previousOtp = 357235626;
                    }, 600000); //10min
                    res.status(200).json({ msg: 'otp has been sent' });
                }
                else {
                    res.status(403).json({ msg: 'Auth not found.' });
                }
            }
            catch (err) {
                console.log(err);
                res.status(403).json({ err });
            }
        });
    }
    resetPass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, otp } = req.body;
            try {
                const Auth = yield this.AuthRepository.findOne({
                    where: { email: AuthEmail },
                });
                // console.log(Auth);
                const hashedPassword = yield argon.hash(password);
                const currentOtp = otp;
                if (currentOtp === previousOtp &&
                    currentOtp.toString().length == 4) {
                    Auth.password = hashedPassword;
                    yield Auth.save();
                    previousOtp = Math.floor(Math.random() * 9999999999) + 10000000;
                    AuthEmail = null;
                    res.status(200).json({
                        success: true,
                        msg: 'password changed'
                    });
                }
                else {
                    res.status(403).json({ msg: 'invalid otp try again' });
                }
            }
            catch (err) {
                console.log(err);
                res.status(403).json({ err });
            }
        });
    }
    updateEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const { id } = req.params;
                const data = yield this.AuthRepository.update(id, { email });
                if (data) {
                    res.status(200).json({ success: true, msg: "Email Updated" });
                }
                else {
                    res
                        .status(403)
                        .json({ success: false, msg: "unable to update email" });
                }
            }
            catch (err) {
                console.log(err);
                res.status(403).json({ err });
            }
        });
    }
    deleteAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield this.AuthRepository.delete({ id });
                if (data.affected && data.affected > 0) {
                    res.status(200).json({ success: true, msg: "Auth deleted" });
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
exports.default = AuthController;
