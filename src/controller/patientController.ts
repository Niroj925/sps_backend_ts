import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Patient } from "../entity/patient.entity";
import { AppDataSource } from "../config/db.config";
import { Doctor } from "../entity/doctor.entity";

export default class PatientController {


  private patientRepository: Repository<Patient>;
  private doctorRepository: Repository<Doctor>;
  constructor() {
    this.patientRepository = AppDataSource.getRepository(Patient),
    this.doctorRepository = AppDataSource.getRepository(Doctor)
  }

  async createAccount(req: Request, res: Response) {
    try {
      const { name, contact, email, stroke } = req.body;
      const { id } = req.params;

      const newPatient = await this.patientRepository.save({
        name,
        contact,
        email,
        stroke,
        prescription: '',
        doctorId: id
      });

      const doctor: Doctor | null = await this.doctorRepository.findOne({
        where: { id }
      });

      if (doctor) {
        doctor.visitPatient += 1;
        await this.doctorRepository.save(doctor);
      }
      // await client.del('patients')
      res.status(200).json(newPatient);
    } catch (error) {
      console.error('Error creating admin:', error);
      res.status(403).json({ error })
    }
  }

  async getAllPatient(req: Request, res: Response) {
    try {
      const patients = await this.patientRepository.find();
      res.status(200).json(patients)
    } catch (err) {
      console.log(err)
      res.status(403).json({ err })
    }
  }

  async getDoctorPatients(req: Request, res: Response) {
    const { id } = req.params;
    try {

      // const cachedValue=await client.get('patients');

      //   if(cachedValue){
      //     return res.status(200).json(JSON.parse (cachedValue));
      //  }

      const patients = await this.patientRepository.find({ where: { doctor: { id } } });
      // await client.set('patients',JSON.stringify(doctor));
      // await  client.expire('patients',20)//expire after 10 minutes

      res.status(200).json(patients);
    } catch (err) {
      console.log(err);
      res.status(403).json({ err })
    }
  }

  async getPateint(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const patients = await this.patientRepository.findOne(
        {
          where: {
            id
          }
        }
      );
      res.status(200).json(patients);
    } catch (err) {
      console.log(err);
      res.status(403).json({ err })
    }
  }

  async updatePrescription(req: Request, res: Response) {
    const { id } = req.params;
    const { prescription } = req.body;
    try {
      const patient: Patient | null = await this.patientRepository.findOne({ where: { id } });
      patient && (
        patient.prescription = prescription,
        await this.doctorRepository.save(patient)
      )
      res.status(200).json(patient);
    } catch (err) {
      console.log(err);
      res.status(403).json({ err })
    }
  }

  async deletePatient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.patientRepository.delete({ id });
      if (data) {
        // await client.del('patients')
        res.status(200).json({ success: true, msg: "patient deleted" });
      } else {
        res.status(403).json({ success: false, msg: "unable to delete" });
      }
    } catch (err) {
      console.log(err);
      res.status(403).json({ err })
    }
  }
}