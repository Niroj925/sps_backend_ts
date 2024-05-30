import * as argon from 'argon2'
import { AppDataSource } from '../config/db.config';
import { Auth } from '../entity/auth.entity';
import { Repository } from 'typeorm';
import {  roleType } from '../helper/type/type';
import {Request,Response} from 'express'
import { Token } from '../helper/utils/token';


let previousOtp:any =null;
let AuthEmail:any=null;
export default class AuthController{
  private AuthRepository: Repository<Auth>;

  constructor() {
    this.AuthRepository = AppDataSource.getRepository(Auth);
  }

  async createAdmin(req:any, res:any){
    try {
    const { email, password } = req.body;
    const admin=await this.AuthRepository.find({where:{role:roleType.admin}});
    console.log(admin)
    if(admin.length>0){
      throw new Error('admin already exist')
    }
    const hashedPassword=await argon.hash(password);
      const newAuth = await this.AuthRepository.save({
        email,
        password:hashedPassword,
        role:roleType.admin
      });
      res.status(200).json(newAuth);
    } catch (error) {
      console.error("Error creating Auth:", error);
      res.status(403).json({error})

    }
  }
    async createAccount(req:any, res:any){
        const { email, password } = req.body;
        const user=req.user;
        console.log(user);
        const hashedPassword=await argon.hash(password);
        const admin=await this.AuthRepository.find({where:{role:roleType.admin}});
        try {
          const newAuth = await this.AuthRepository.save({
            email,
            password:hashedPassword,
            role:roleType.doctor
          });
          res.status(200).json(newAuth);
        } catch (error) {
          console.error("Error creating Auth:", error);
          res.status(403).json({error})
    
        }
      }
    
      async login(req:Request,res:Response){
        // console.log(req.body);
        const {email,password}=req.body;
        try{
            const user:any=await this.AuthRepository.findOne({where:{ email }});
            if(!user){
                res.status(403).json({msg:'invalid credentials'});
            }
    
            const match = await argon.verify(user.password,password);
    
            if(match){
              const payload={
                sub:user.id,
                email:user.email,
                role:user.role
              };
              const token=new Token();
              const accessToken=await token.generateAcessToken(payload);
              const refreshToken=await token.generateRefreshToken(payload);
                res.status(200).json({token:{accessToken,refreshToken}});
            }else{
                res.status(403).json({msg:'invalid credentials'});
            }
    
        }catch(err){
            console.log(err)
            res.status(403).json({err})
        }
    }
    
    async generateOtp(req:Request,res:Response) {
      const {email}=req.body;
      console.log(email);
      try {
        const isEmailExist = await this.AuthRepository.findOne({
          where: {email },
        });
        console.log(isEmailExist);
        if (isEmailExist) {
          AuthEmail=email;
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
    
          res.status(200).json({msg:'otp has been sent'})
        } else {
          res.status(403).json({msg:'Auth not found.'})
        }
      } catch (err) {
        console.log(err);
        res.status(403).json({err})
      }
    }
    
    async resetPass(req:Request,res:Response) {
       const {password,otp}=req.body;
      try {
        const Auth:any = await this.AuthRepository.findOne({
          where:{email:AuthEmail},
        });
        
        // console.log(Auth);
        const hashedPassword=await argon.hash(password);
        const currentOtp = otp;
        if (
          currentOtp === previousOtp &&
          currentOtp.toString().length == 4
        ) {
          Auth.password = hashedPassword;
          await Auth.save();
          previousOtp = Math.floor(Math.random() * 9999999999) + 10000000;
          AuthEmail = null;
          res.status(200).json({
             success:true,
             msg:'password changed'
            })
        } else {
          res.status(403).json({msg:'invalid otp try again'});
        }
      } catch (err) {
        console.log(err);
        res.status(403).json({err})
      }
    }
    
      async updateEmail(req:Request, res:Response) {
        try{
        const { email } = req.body;
        const { id } = req.params;
        const data = await this.AuthRepository.update(id, { email });
        if (data) {
          res.status(200).json({ success: true, msg: "Email Updated" });
        } else {
          res
            .status(403)
            .json({ success: false, msg: "unable to update email" });
        }
      }catch(err){
        console.log(err)
        res.status(403).json({err})
      }
      }
    
      async deleteAuth(req:Request, res:Response) {
        try{
        const { id } = req.params;
        const data = await this.AuthRepository.delete({id});
        if (data.affected && data.affected>0) {
          res.status(200).json({ success: true, msg: "Auth deleted" });
        } else {
          res.status(403).json({ success: false, msg: "unable to delete" });
        }
      }catch(err){
      console.log(err)
      res.status(403).json({err})
    }
      }
}