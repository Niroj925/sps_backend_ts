"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
const typeorm_1 = require("typeorm");
const _1 = require("./");
const patient_entity_1 = require("./patient.entity");
const auth_entity_1 = require("./auth.entity");
let Doctor = class Doctor extends _1.parentEntity {
};
exports.Doctor = Doctor;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Doctor.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Doctor.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Doctor.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Doctor.prototype, "ratingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Doctor.prototype, "ratings", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Doctor.prototype, "visitPatient", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Doctor.prototype, "hospital", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Doctor.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => auth_entity_1.Auth, auth => auth.doctor, { onDelete: 'CASCADE' }),
    __metadata("design:type", auth_entity_1.Auth)
], Doctor.prototype, "auth", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => patient_entity_1.Patient, patient => patient.doctor, { onDelete: "CASCADE" }),
    __metadata("design:type", Array)
], Doctor.prototype, "patient", void 0);
exports.Doctor = Doctor = __decorate([
    (0, typeorm_1.Entity)('doctor')
], Doctor);
