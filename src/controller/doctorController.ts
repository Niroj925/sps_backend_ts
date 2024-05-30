import { Request,Response } from "express";
import { Repository } from "typeorm";
import { Doctor } from "../entity/doctor.entity";
import { AppDataSource } from "../config/db.config";

export default class DoctorController{

    private doctorRepository: Repository<Doctor>;

    constructor() {
      this.doctorRepository = AppDataSource.getRepository(Doctor);
    }
    
    async createProfile(req:any, res:Response){
        console.log(req.body)
        const { name, contact, hospital, description } = req.body;
        const { id } = req.params;
        const user=req.user;
        // console.log(id);
        try {
            // Create a new doctor
            const doctorProfile = await this.doctorRepository.save({
                name,
                contact,
                email:user.jwtPayload.email,
                ratingCount:0,
                ratings: 0,
                visitPatient: 0,
                hospital,
                description,
                userId: user.jwtPayload.sub
            });
            //   console.log('New Doctor created:', newDoctor.toJSON()); 

            // await client.del('doctors')
            res.status(200).json(doctorProfile);

        } catch (error) {
            console.error('Error creating doctor:', error);
            res.status(403).json({ error })
        }

    }

    async getDoctors(req:Request, res:Response) {
        try {
            // const cachedValue = await client.get('doctors');

            // if (cachedValue) {
            //     return res.status(200).json(JSON.parse(cachedValue));
            // }
            const doctor = await this.doctorRepository.find();
            // await client.set('doctors', JSON.stringify(doctor));
            // await client.expire('doctors', 20)//expire after 10 minutes
            // console.log('cached not found');

            res.status(200).json(doctor);

        } catch (err) {
            console.log(err)
        }
    }

    async getDoctor(req:Request, res:Response) {
        const { userId } = req.params;
        
        try {
            const doctor = await this.doctorRepository.findOne({where:{id:userId}});
            if (doctor) {
                res.status(200).json(doctor);
            } else {
                res.status(403).json({ msg: 'doctor not found' });
            }
        } catch (err) {
            console.log(err);
            res.status(403).json({ err })
        }
    }

    async addRating(req:Request, res:Response) {
        const { id } = req.params;
        const { rating } = req.body;
        try {
            // Find the doctor by ID
            const doctorInfo= await this.doctorRepository.findOne({where:{id}});
            if(!doctorInfo){
                return res.status(403).json({msg:'not found'})
            }
            const tr=doctorInfo.ratings+rating
            const rc=doctorInfo.ratingCount+1;
            const doctor = await this.doctorRepository.update(id,{ratings:tr,ratingCount:rc});
            if (!doctor) {
                return res.status(404).json({ message: "Doctor not found" });
            }

            return res.status(200).json({success:true,msg:'rated'});
        } catch (error) {
            console.error("Error adding rating:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }


    async getDoctorRatings(req:Request, res:Response) {
        const { doctorId } = req.params;

        try {
            // Find the doctor by ID
            const doctor = await this.doctorRepository.findOne({where:{id:doctorId}});

            if (!doctor) {
                return res.status(404).json({ message: "Doctor not found" });
            }
            // Extract and return the ratings of the doctor
            const ratings = doctor.ratings/doctor.ratingCount;

            return res.status(200).json({ rating:ratings.toFixed(2) });
        } catch (error) {
            console.error("Error fetching doctor ratings:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteDoctor(req:Request, res:Response) {
        const { id } = req.params;
        try {
          const data=await this.doctorRepository.delete({id})

            if (data) {
                // await client.del('doctors')
                res.status(200).json({ success: true, msg: "doctor deleted" });
            } else {
                res.status(403).json({ success: false, msg: "unable to delete" });
            }
        } catch (err) {
            console.log(err);
            res.status(403).json({ err })
        }
    }


}