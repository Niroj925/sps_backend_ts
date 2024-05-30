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
exports.Patient = void 0;
// import { Column, Entity, ManyToOne } from "typeorm";
// import { parentEntity } from ".";
const index_1 = require("../../node_modules/typeorm/index");
const doctor_entity_1 = require("./doctor.entity");
const index_2 = require("./index");
let Patient = class Patient extends index_2.parentEntity {
};
exports.Patient = Patient;
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", String)
], Patient.prototype, "name", void 0);
__decorate([
    (0, index_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Patient.prototype, "contact", void 0);
__decorate([
    (0, index_1.Column)(),
    __metadata("design:type", String)
], Patient.prototype, "email", void 0);
__decorate([
    (0, index_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Patient.prototype, "stroke", void 0);
__decorate([
    (0, index_1.Column)('text'),
    __metadata("design:type", String)
], Patient.prototype, "prescription", void 0);
__decorate([
    (0, index_1.ManyToOne)(() => doctor_entity_1.Doctor, doctor => doctor.patient, { onDelete: 'CASCADE' }),
    __metadata("design:type", doctor_entity_1.Doctor)
], Patient.prototype, "doctor", void 0);
exports.Patient = Patient = __decorate([
    (0, index_1.Entity)('patient')
], Patient);